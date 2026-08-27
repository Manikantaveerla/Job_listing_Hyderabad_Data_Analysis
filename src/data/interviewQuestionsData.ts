export interface InterviewQuestion {
  id: string;
  category: "sql" | "excel" | "powerbi" | "python" | "business_stats";
  skillName: string;
  difficulty: "Basic" | "Intermediate" | "Advanced" | "Tricky";
  title: string;
  subtitle?: string;
  scenario: string;
  codeSnippet?: string;
  formulaSnippet?: string;
  explanation: string;
  interviewerGotcha?: string;
  tags: string[];
}

export const sqlInterviewQuestions: InterviewQuestion[] = [
  {
    id: "sql-1",
    category: "sql",
    skillName: "SQL",
    difficulty: "Basic",
    title: "1. Difference between WHERE and HAVING Clauses",
    scenario: "Crucial for filtering before vs after aggregations in reporting queries.",
    codeSnippet: `-- WHERE filters raw rows before aggregation
-- HAVING filters grouped rows after aggregation
SELECT department_id, AVG(salary) AS avg_dept_salary
FROM Employees
WHERE status = 'Active' -- row-level filter
GROUP BY department_id
HAVING AVG(salary) > 75000; -- aggregated group filter`,
    explanation: "WHERE operates on individual records before any grouping occurs and cannot use aggregate functions (like SUM, AVG, COUNT). HAVING operates on groups after GROUP BY is performed and can evaluate aggregate expressions.",
    interviewerGotcha: "Never use HAVING to filter non-aggregated columns that could have been filtered in WHERE. Doing so degrades query performance by forcing the database to group unneeded rows.",
    tags: ["Core SQL", "Aggregation", "GROUP BY", "WHERE vs HAVING"],
  },
  {
    id: "sql-2",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "2. Difference between ROW_NUMBER(), RANK(), and DENSE_RANK()",
    scenario: "The most asked SQL window function question across all analytics interviews.",
    codeSnippet: `-- Comparing ranking behaviors on duplicate salaries: (100k, 90k, 90k, 80k)
SELECT employee_name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,  -- 1, 2, 3, 4
       RANK()       OVER (ORDER BY salary DESC) AS rank_val, -- 1, 2, 2, 4 (skips 3)
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rn  -- 1, 2, 2, 3 (no skip)
FROM Salaries;`,
    explanation: "• ROW_NUMBER(): Assigns a unique sequential integer to each row regardless of duplicate values.\n• RANK(): Assigns duplicate ranks for tied values, but skips subsequent rank numbers by the number of ties.\n• DENSE_RANK(): Assigns duplicate ranks for tied values without skipping subsequent rank numbers.",
    interviewerGotcha: "Always use DENSE_RANK() when asked to find the 'Nth highest salary' or 'Nth largest transaction' so ties don't cause the Nth rank to be skipped.",
    tags: ["Window Functions", "Ranking", "DENSE_RANK", "Salary Queries"],
  },
  {
    id: "sql-3",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "3. Finding the Nth Highest Salary (Multiple Approaches)",
    scenario: "Frequently tested for both single-department and per-department rankings.",
    codeSnippet: `-- Approach 1: Modern & Robust (Using DENSE_RANK & CTE - handles ties & multiple departments)
WITH RankedSalaries AS (
  SELECT department_id, employee_id, salary,
         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_pos
  FROM Employees
)
SELECT * FROM RankedSalaries WHERE rank_pos = 2; -- 2nd highest salary

-- Approach 2: Traditional Subquery (Single Department / Overall)
SELECT MAX(salary) AS second_highest_salary
FROM Employees
WHERE salary < (SELECT MAX(salary) FROM Employees);`,
    explanation: "The CTE with DENSE_RANK() partitioned by department is preferred because it works across all SQL dialects, seamlessly handles multiple departments simultaneously, and cleanly manages duplicate salary ties.",
    interviewerGotcha: "If asked 'What if there is only 1 employee or salaries are all equal?', ensure your query returns NULL rather than erroring out.",
    tags: ["Window Functions", "CTEs", "Subqueries", "Interview Classic"],
  },
  {
    id: "sql-4",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "4. Calculating Running Totals / Cumulative Sums per User",
    scenario: "Used in FinTech, E-commerce, and SaaS for user spend trajectories and cumulative revenue.",
    codeSnippet: `-- Cumulative daily revenue per customer
SELECT customer_id, order_date, order_amount,
       SUM(order_amount) OVER (
         PARTITION BY customer_id
         ORDER BY order_date ASC
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cumulative_spend
FROM Orders;`,
    explanation: "The window specification `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` instructs the database engine to sum all previous rows within that customer's partition up to and including the current record.",
    interviewerGotcha: "If you omit `ROWS BETWEEN...` and multiple orders share the exact same timestamp, `RANGE BETWEEN` may aggregate all identical dates simultaneously instead of calculating incrementally per row.",
    tags: ["Window Functions", "Running Total", "Cumulative", "E-Commerce"],
  },
  {
    id: "sql-5",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "5. Difference between LAG() and LEAD() Window Functions",
    scenario: "Essential for calculating Month-over-Month (MoM) growth, churn lapses, and time intervals between transactions.",
    codeSnippet: `-- Calculate Day-over-Day Revenue Delta & % Growth
WITH DailySales AS (
  SELECT order_date, SUM(amount) AS daily_rev
  FROM Transactions
  GROUP BY order_date
)
SELECT order_date, daily_rev,
       LAG(daily_rev, 1) OVER (ORDER BY order_date) AS prev_day_rev,
       (daily_rev - LAG(daily_rev, 1) OVER (ORDER BY order_date)) AS rev_change,
       ROUND(
         (daily_rev - LAG(daily_rev, 1) OVER (ORDER BY order_date)) * 100.0 / 
         NULLIF(LAG(daily_rev, 1) OVER (ORDER BY order_date), 0), 2
       ) AS pct_growth
FROM DailySales;`,
    explanation: "• LAG(col, n): Accesses data from `n` rows prior to the current row in the partition.\n• LEAD(col, n): Accesses data from `n` rows subsequent to the current row.\nGreatly simplifies queries that previously required costly self-joins.",
    interviewerGotcha: "Always wrap the denominator in `NULLIF(..., 0)` to prevent division-by-zero runtime exceptions on the first record or zero-revenue days.",
    tags: ["LAG & LEAD", "Time Series", "MoM Growth", "Window Functions"],
  },
  {
    id: "sql-6",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "6. Identifying and Deleting Duplicate Records",
    scenario: "A standard data-cleaning interview question for database engineers and analysts.",
    codeSnippet: `-- Step 1: Identify duplicates
SELECT email, COUNT(*) AS occurrences
FROM Users
GROUP BY email
HAVING COUNT(*) > 1;

-- Step 2: Delete duplicate records keeping only the earliest record (using CTE & ROW_NUMBER)
WITH RankedDuplicates AS (
  SELECT user_id, email,
         ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) AS row_seq
  FROM Users
)
DELETE FROM RankedDuplicates
WHERE row_seq > 1;`,
    explanation: "By partitioning by the duplicate columns (`email`) and ordering by a unique timestamp/ID (`created_at ASC`), we keep `row_seq = 1` as the master record and safely delete all subsequent instances (`row_seq > 1`).",
    interviewerGotcha: "In MySQL, you cannot delete directly from a CTE in certain older versions without joining against the table, whereas in PostgreSQL / T-SQL / Snowflake it deletes directly from the CTE partition.",
    tags: ["Data Cleaning", "Deduplication", "ROW_NUMBER", "CTEs"],
  },
  {
    id: "sql-7",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "7. Difference between UNION and UNION ALL",
    scenario: "Fundamental performance question tested in almost every screening test.",
    codeSnippet: `-- UNION: Combines datasets AND performs a distinct sort to eliminate duplicates (Costly)
SELECT city FROM Customers
UNION
SELECT city FROM Suppliers;

-- UNION ALL: Simply stacks datasets together without deduplication (Fast & Light)
SELECT city FROM Customers
UNION ALL
SELECT city FROM Suppliers;`,
    explanation: "• UNION: Performs an internal sort and distinct operation in memory to eliminate duplicate rows across both result sets. Much slower on large tables.\n• UNION ALL: Appends the second dataset to the first without checking for duplicates. It is significantly faster and uses less CPU/RAM.",
    interviewerGotcha: "Always default to UNION ALL when you know the datasets are naturally disjoint or when duplicate counts are intentional.",
    tags: ["Set Operations", "UNION vs UNION ALL", "Performance"],
  },
  {
    id: "sql-8",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "8. Consecutive Active Days / Log-in Streak Problem",
    scenario: "A famous LeetCode Hard / Product Analytics challenge (Gaps and Islands).",
    codeSnippet: `-- Find users with at least 3 consecutive login days
WITH DistinctLogins AS (
  -- Deduplicate multiple logins on the same day
  SELECT DISTINCT user_id, CAST(login_time AS DATE) AS login_date
  FROM UserLogins
),
GroupedStreaks AS (
  SELECT user_id, login_date,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn,
         -- Subtracting row number days creates a constant anchor date for consecutive days!
         DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) AS streak_group
  FROM DistinctLogins
)
SELECT user_id, MIN(login_date) AS streak_start, MAX(login_date) AS streak_end, COUNT(*) AS streak_length
FROM GroupedStreaks
GROUP BY user_id, streak_group
HAVING COUNT(*) >= 3;`,
    explanation: "The 'Date - ROW_NUMBER()' mathematical trick creates an identical anchor date (`streak_group`) for consecutive calendar days. When the streak breaks, the anchor date changes, creating separate island groups.",
    interviewerGotcha: "If a user logs in 5 times on the same date, you must first deduplicate with `DISTINCT` before computing `ROW_NUMBER()`, otherwise the date-difference formula collapses.",
    tags: ["Gaps and Islands", "Consecutive Days", "Advanced SQL", "User Retention"],
  },
  {
    id: "sql-9",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "9. Self-Joins: Manager-Employee Hierarchy",
    scenario: "Used to navigate hierarchical organizational charts and parent-child relational entities.",
    codeSnippet: `-- Find all employees and their respective manager's name
SELECT e.employee_id,
       e.first_name AS employee_name,
       e.salary AS employee_salary,
       m.first_name AS manager_name,
       m.salary AS manager_salary
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary; -- Bonus: Employees who earn more than their direct manager`,
    explanation: "A self-join joins a table to itself using two distinct aliases (`e` for employee, `m` for manager). Using a `LEFT JOIN` ensures top-level executives (who have a `NULL` manager_id) are not accidentally excluded.",
    interviewerGotcha: "If you use an `INNER JOIN`, the CEO / top executives with `manager_id IS NULL` will disappear from the results.",
    tags: ["Self Join", "Hierarchical Data", "Joins", "Schema Design"],
  },
  {
    id: "sql-10",
    category: "sql",
    skillName: "SQL",
    difficulty: "Basic",
    title: "10. NULL Handling: COUNT(*) vs. COUNT(column) & COALESCE()",
    scenario: "A classic trap question to test understanding of three-valued SQL logic (TRUE, FALSE, UNKNOWN).",
    codeSnippet: `-- COUNT(*) counts all rows including NULLs
-- COUNT(col) counts only NON-NULL entries in that specific column
SELECT 
  COUNT(*) AS total_rows,
  COUNT(bonus) AS employees_with_bonus,
  AVG(bonus) AS avg_bonus_excluding_nulls,
  AVG(COALESCE(bonus, 0)) AS avg_bonus_treating_null_as_zero
FROM Compensation;`,
    explanation: "In SQL, aggregate functions (except `COUNT(*)`) ignore NULL values entirely. `AVG(bonus)` divides the sum only by employees who received a bonus. If you want the average across the entire workforce, you must use `COALESCE(bonus, 0)`.",
    interviewerGotcha: "Never use `= NULL` in a WHERE filter. SQL uses three-valued logic; you must use `IS NULL` or `IS NOT NULL`.",
    tags: ["NULL Logic", "COALESCE", "Aggregation", "Gotchas"],
  },
  {
    id: "sql-11",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "11. Pivot Queries using Conditional Aggregation (CASE WHEN)",
    scenario: "Converting row-based transactional data into column-based monthly reporting summaries.",
    codeSnippet: `-- Pivoting quarterly sales by region
SELECT region,
       SUM(CASE WHEN quarter = 'Q1' THEN sales_amount ELSE 0 END) AS Q1_Sales,
       SUM(CASE WHEN quarter = 'Q2' THEN sales_amount ELSE 0 END) AS Q2_Sales,
       SUM(CASE WHEN quarter = 'Q3' THEN sales_amount ELSE 0 END) AS Q3_Sales,
       SUM(CASE WHEN quarter = 'Q4' THEN sales_amount ELSE 0 END) AS Q4_Sales,
       SUM(sales_amount) AS Total_Annual_Sales
FROM RegionalSales
GROUP BY region;`,
    explanation: "Conditional aggregation using `SUM(CASE WHEN ... THEN ... ELSE 0 END)` is the most universal and portable way to pivot data across MySQL, PostgreSQL, SQL Server, and BigQuery without relying on vendor-specific `PIVOT` operators.",
    interviewerGotcha: "Always provide `ELSE 0` (or `ELSE NULL` if using `COUNT`) inside the `CASE WHEN` to avoid returning `NULL` for missing quarters.",
    tags: ["Conditional Aggregation", "CASE WHEN", "Pivoting", "Reporting"],
  },
  {
    id: "sql-12",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "12. Retention Cohort Analysis: Month-1 & Month-2 Retention",
    scenario: "Product analytics query tested by consumer tech unicorns (Swiggy, Blinkit, Zepto).",
    codeSnippet: `-- Calculate customer cohort retention
WITH UserCohort AS (
  -- First order month per user
  SELECT user_id, 
         DATE_TRUNC('month', MIN(order_date)) AS cohort_month
  FROM Orders
  GROUP BY user_id
),
UserActivity AS (
  SELECT o.user_id,
         c.cohort_month,
         EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', o.order_date), c.cohort_month)) AS month_number
  FROM Orders o
  JOIN UserCohort c ON o.user_id = c.user_id
)
SELECT cohort_month,
       COUNT(DISTINCT CASE WHEN month_number = 0 THEN user_id END) AS cohort_size,
       COUNT(DISTINCT CASE WHEN month_number = 1 THEN user_id END) AS m1_retained,
       ROUND(
         COUNT(DISTINCT CASE WHEN month_number = 1 THEN user_id END) * 100.0 / 
         NULLIF(COUNT(DISTINCT CASE WHEN month_number = 0 THEN user_id END), 0), 1
       ) AS m1_retention_pct
FROM UserActivity
GROUP BY cohort_month
ORDER BY cohort_month;`,
    explanation: "Cohorts are established by each customer's first purchase month. Subsequent transactions are mapped by the month differential (`month_number = 0, 1, 2...`) to track active retention curves.",
    interviewerGotcha: "Always use `COUNT(DISTINCT user_id)` to ensure users placing multiple orders in the same retention month are only counted once.",
    tags: ["Cohort Analysis", "Product Analytics", "Retention Rate", "Advanced SQL"],
  },
  {
    id: "sql-13",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "13. Difference between INNER, LEFT, RIGHT, FULL OUTER, and CROSS JOIN",
    scenario: "The bedrock of relational database operations.",
    codeSnippet: `-- Inner Join: Only matching keys in both tables
-- Left Join: All left rows + matching right (NULL if no match)
-- Right Join: All right rows + matching left
-- Full Outer: All rows from both (NULL for non-matches)
-- Cross Join: Cartesian product (TableA rows * TableB rows)
SELECT c.name, o.order_id
FROM Customers c
CROSS JOIN Products p; -- Creates all possible combinations (e.g. for price testing matrices)`,
    explanation: "Joins combine columns from one or more tables based on related keys. A CROSS JOIN produces a Cartesian product (M * N rows) without requiring an ON condition.",
    interviewerGotcha: "Beware of accidental CROSS JOINs when you forget the `ON` condition in an old-style comma join syntax (`FROM TableA, TableB`).",
    tags: ["Joins", "Relational Algebra", "Cartesian Product"],
  },
  {
    id: "sql-14",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "14. Database Normalization: 1NF, 2NF, and 3NF Explained",
    scenario: "Directly tested in interviews exploring schema design and your Library DB / Wisen IT internship.",
    codeSnippet: `-- 1NF (Atomic): Single value per column, unique row identifiers (Primary Key).
-- Bad: 'Sports, Music' in hobbies column. Good: Split into separate rows.

-- 2NF (No Partial Dependency): 1NF + All non-key columns must depend on the FULL Primary Key (applies to composite PKs).
-- If PK is (Student_ID, Course_ID), Course_Name depends only on Course_ID -> Move to Courses table.

-- 3NF (No Transitive Dependency): 2NF + Non-key columns must depend ONLY on the Primary Key, not on other non-key columns.
-- If PK is Employee_ID, and table has (Department_ID, Department_Name) -> Department_Name depends on Department_ID -> Move to Departments table.`,
    explanation: "Normalization minimizes data redundancy, prevents update/deletion anomalies, and ensures data integrity. 3NF states: 'Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key.'",
    interviewerGotcha: "While 3NF is standard for OLTP transactional databases, OLAP analytical data warehouses (like Snowflake or BigQuery) often intentionally denormalize into Star Schemas for fast read performance.",
    tags: ["Normalization", "3NF", "Database Design", "Relational Theory"],
  },
  {
    id: "sql-15",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "15. Clustered vs. Non-Clustered Indexes & Query Execution Plans",
    scenario: "How you cut query runtime by ~35% during your Wisen IT data analyst internship.",
    codeSnippet: `-- Clustered Index: Determines the physical storage order of data rows in the table. (Only 1 per table, usually Primary Key).
CREATE CLUSTERED INDEX idx_emp_id ON Employees(employee_id);

-- Non-Clustered Index: Creates a separate lookup structure with pointers back to physical rows (Can have multiple).
CREATE NONCLUSTERED INDEX idx_emp_dept_salary ON Employees(department_id, salary)
INCLUDE (first_name, email); -- Covering index avoids bookmark lookups`,
    explanation: "A Clustered Index is like a telephone directory sorted alphabetically by name. A Non-Clustered Index is like the index at the back of a textbook with page references. A 'Covering Index' contains all columns required by a query, allowing the engine to satisfy the request purely from index leaf nodes without touching the physical table data.",
    interviewerGotcha: "Indexes speed up `SELECT` reads but slow down `INSERT`, `UPDATE`, and `DELETE` writes because the index B-Trees must be restructured on every write.",
    tags: ["Indexing", "Query Optimization", "Execution Plan", "Performance"],
  },
  {
    id: "sql-16",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "16. Difference between EXISTS vs. IN and Subquery Optimization",
    scenario: "Query tuning and understanding semi-joins.",
    codeSnippet: `-- Using EXISTS (Stops scanning immediately upon finding the first match - Boolean True/False)
SELECT c.customer_id, c.customer_name
FROM Customers c
WHERE EXISTS (
  SELECT 1 FROM Orders o 
  WHERE o.customer_id = c.customer_id AND o.amount > 500
);

-- Using IN (Can be dangerous if subquery contains NULLs)
SELECT customer_id, customer_name
FROM Customers
WHERE customer_id IN (SELECT customer_id FROM Orders WHERE amount > 500);`,
    explanation: "`EXISTS` evaluates whether a subquery returns any rows (short-circuiting as soon as a single match is found). `NOT IN` fails completely and returns zero rows if the subquery returns even a single `NULL` value, whereas `NOT EXISTS` handles NULLs reliably.",
    interviewerGotcha: "Always prefer `NOT EXISTS` over `NOT IN` when checking for non-existence to avoid NULL-related logic bugs.",
    tags: ["EXISTS vs IN", "Subqueries", "Optimization", "Semi-Joins"],
  },
  {
    id: "sql-17",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "17. NTILE() Window Function for Quartiles & Deciles",
    scenario: "Dividing customers into High, Medium, Low value tiers (RFM segmentation).",
    codeSnippet: `-- Divide customers into 4 equal spend quartiles (Tier 1 = Top 25%)
SELECT customer_id, total_spend,
       NTILE(4) OVER (ORDER BY total_spend DESC) AS spend_quartile,
       CASE NTILE(4) OVER (ORDER BY total_spend DESC)
         WHEN 1 THEN 'Platinum'
         WHEN 2 THEN 'Gold'
         WHEN 3 THEN 'Silver'
         ELSE 'Bronze'
       END AS customer_segment
FROM CustomerLifetimeValue;`,
    explanation: "`NTILE(n)` divides an ordered partition into `n` approximately equal ranked buckets and assigns a bucket number from 1 to `n` to each row.",
    interviewerGotcha: "If the total number of rows does not divide evenly by `n`, the extra rows are distributed to the first buckets (e.g. 10 rows into 4 buckets gives bucket sizes: 3, 3, 2, 2).",
    tags: ["NTILE", "Segmentation", "Quartiles", "Window Functions"],
  },
  {
    id: "sql-18",
    category: "sql",
    skillName: "SQL",
    difficulty: "Tricky",
    title: "18. Finding Users with Overlapping Bookings / Event Collisions",
    scenario: "Common interview question in travel (MakeMyTrip), hotel booking (OYO), and scheduling platforms.",
    codeSnippet: `-- Find overlapping room bookings
SELECT b1.booking_id AS booking_1, b2.booking_id AS booking_2, b1.room_id
FROM Bookings b1
JOIN Bookings b2 ON b1.room_id = b2.room_id 
                AND b1.booking_id < b2.booking_id -- Avoid duplicate reverse pairs
WHERE b1.check_in_date < b2.check_out_date 
  AND b1.check_out_date > b2.check_in_date;`,
    explanation: "Two date intervals `[StartA, EndA]` and `[StartB, EndB]` overlap if and only if `StartA < EndB AND EndA > StartB`. The `b1.booking_id < b2.booking_id` condition eliminates comparing a booking against itself or producing duplicate swapped pairs.",
    interviewerGotcha: "Never use 4 complicated `CASE` checks when this single 2-condition inequality handles all overlapping configurations.",
    tags: ["Date Overlaps", "Self Join", "Intervals", "Booking Logic"],
  },
  {
    id: "sql-19",
    category: "sql",
    skillName: "SQL",
    difficulty: "Basic",
    title: "19. LIKE vs. ILIKE and Pattern Matching Wildcards",
    scenario: "Filtering strings, regex, and case-sensitivity.",
    codeSnippet: `-- % matches zero or more characters
-- _ matches exactly one single character
SELECT * FROM Customers WHERE email LIKE 'm%@gmail.com'; -- starts with 'm'
SELECT * FROM Products WHERE product_code LIKE 'PRD___'; -- exactly 3 characters after PRD
-- In PostgreSQL: ILIKE is case-insensitive
SELECT * FROM Employees WHERE first_name ILIKE 'mani%';`,
    explanation: "`%` represents any string of zero or more characters; `_` represents any single character. In MySQL/SQL Server, default collations are often case-insensitive, whereas in PostgreSQL `LIKE` is case-sensitive and `ILIKE` is case-insensitive.",
    interviewerGotcha: "Leading wildcards like `LIKE '%search'` cannot use standard B-Tree indexes and force a full table scan.",
    tags: ["Pattern Matching", "Strings", "Wildcards", "Basic SQL"],
  },
  {
    id: "sql-20",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "20. String Aggregation: GROUP_CONCAT() vs STRING_AGG() vs LISTAGG()",
    scenario: "Aggregating multiple child records into a single comma-separated string list.",
    codeSnippet: `-- PostgreSQL / BigQuery:
SELECT department_id, STRING_AGG(employee_name, ', ' ORDER BY salary DESC) AS top_earners
FROM Employees
GROUP BY department_id;

-- MySQL:
-- SELECT department_id, GROUP_CONCAT(employee_name ORDER BY salary DESC SEPARATOR ', ') FROM Employees GROUP BY department_id;

-- SQL Server (2017+):
-- SELECT department_id, STRING_AGG(employee_name, ', ') WITHIN GROUP (ORDER BY salary DESC) FROM Employees GROUP BY department_id;`,
    explanation: "String aggregation concatenates non-null values from a group into a single delimited string. Useful for displaying all ordered items on a single invoice line.",
    interviewerGotcha: "Mention the dialect difference (Postgres `STRING_AGG`, MySQL `GROUP_CONCAT`, Oracle `LISTAGG`) to showcase broad database fluency.",
    tags: ["String Aggregation", "STRING_AGG", "GROUP_CONCAT", "Dialects"],
  },
  {
    id: "sql-21",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "21. Recursive Common Table Expressions (Hierarchical Tree Traversal)",
    scenario: "Navigating nested category taxonomies or organizational reporting chains.",
    codeSnippet: `-- Recursive CTE to build full management hierarchy chain
WITH RECURSIVE OrgHierarchy AS (
  -- Anchor Member: Top CEO
  SELECT employee_id, first_name, manager_id, 1 AS level, CAST(first_name AS VARCHAR(255)) AS path
  FROM Employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive Member: Subordinates joining back to CTE
  SELECT e.employee_id, e.first_name, e.manager_id, o.level + 1, CAST(CONCAT(o.path, ' -> ', e.first_name) AS VARCHAR(255))
  FROM Employees e
  JOIN OrgHierarchy o ON e.manager_id = o.employee_id
)
SELECT * FROM OrgHierarchy ORDER BY level, employee_id;`,
    explanation: "A Recursive CTE contains an Anchor query (base case) and a Recursive query joined together via `UNION ALL` that repeatedly executes until no new rows are returned.",
    interviewerGotcha: "Always ensure your termination condition is sound to prevent infinite execution loops on circular references.",
    tags: ["Recursive CTE", "Hierarchies", "Tree Traversal", "Advanced SQL"],
  },
  {
    id: "sql-22",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "22. Calculating Median in SQL (Without Native MEDIAN Function)",
    scenario: "PostgreSQL and MySQL lack a direct `MEDIAN()` keyword in basic aggregates.",
    codeSnippet: `-- PostgreSQL approach using PERCENTILE_CONT
SELECT department_id,
       PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
FROM Employees
GROUP BY department_id;

-- Universal ANSI SQL approach using ROW_NUMBER
WITH OrderedSalaries AS (
  SELECT salary,
         ROW_NUMBER() OVER (ORDER BY salary) AS row_asc,
         ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_desc
  FROM Employees
)
SELECT AVG(salary) AS median_salary
FROM OrderedSalaries
WHERE row_asc IN (row_desc, row_desc - 1, row_desc + 1);`,
    explanation: "When row counts are odd, `row_asc = row_desc` locates the exact middle value. When even, `row_asc = row_desc ± 1` captures the two middle values, and `AVG()` computes their midpoint.",
    interviewerGotcha: "Never confuse Mean (average) with Median. In skewed distributions (like salary or net worth), the Median is a far more robust central metric.",
    tags: ["Median", "Percentiles", "Statistics in SQL", "Math"],
  },
  {
    id: "sql-23",
    category: "sql",
    skillName: "SQL",
    difficulty: "Basic",
    title: "23. Primary Key vs. Unique Key vs. Foreign Key",
    scenario: "Core database integrity constraints.",
    codeSnippet: `-- Primary Key: Uniquely identifies a record, CANNOT be NULL (Only 1 per table)
-- Unique Key: Ensures all values in column are distinct, ALLOWS 1 NULL value (Can have multiple per table)
-- Foreign Key: Enforces referential integrity by referencing Primary Key in parent table
CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);`,
    explanation: "Primary Keys automatically create a Clustered Index (by default in SQL Server/MySQL InnoDB). Foreign Keys guarantee that child rows cannot point to non-existent parent rows.",
    interviewerGotcha: "Remember that `ON DELETE CASCADE` automatically deletes dependent child rows when a parent record is removed.",
    tags: ["Keys & Constraints", "Referential Integrity", "DBMS"],
  },
  {
    id: "sql-24",
    category: "sql",
    skillName: "SQL",
    difficulty: "Intermediate",
    title: "24. Transaction ACID Properties Explained with Real Scenarios",
    scenario: "Tested in banking, payment gateway (Razorpay, Juspay), and enterprise interviews.",
    codeSnippet: `-- Atomic Transaction Example in Banking:
BEGIN TRANSACTION;
  UPDATE Accounts SET balance = balance - 1000 WHERE account_id = 'ACC_A';
  UPDATE Accounts SET balance = balance + 1000 WHERE account_id = 'ACC_B';
COMMIT; -- If any step fails, ROLLBACK restores both balances to original state.`,
    explanation: "• Atomicity: All operations in the transaction succeed, or all fail (all-or-nothing).\n• Consistency: Database transitions from one valid state to another, obeying all constraints.\n• Isolation: Concurrent transactions execute independently without dirty reads.\n• Durability: Once committed, updates persist permanently even if the server crashes.",
    interviewerGotcha: "Mention the four isolation levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
    tags: ["ACID Properties", "Transactions", "FinTech", "Data Integrity"],
  },
  {
    id: "sql-25",
    category: "sql",
    skillName: "SQL",
    difficulty: "Advanced",
    title: "25. Finding Users Who Purchased in Category A AND Category B (Relational Division)",
    scenario: "Cross-selling and basket analysis query.",
    codeSnippet: `-- Find users who bought BOTH 'Electronics' AND 'Books'
SELECT customer_id
FROM Orders
WHERE category IN ('Electronics', 'Books')
GROUP BY customer_id
HAVING COUNT(DISTINCT category) = 2;`,
    explanation: "By filtering `WHERE category IN ('Electronics', 'Books')` and checking `HAVING COUNT(DISTINCT category) = 2`, we guarantee the customer transacted in both target categories without needing expensive self-joins.",
    interviewerGotcha: "If you omit `DISTINCT` inside `COUNT(DISTINCT category)`, a customer who bought 2 items in 'Electronics' but 0 in 'Books' would falsely pass.",
    tags: ["Relational Division", "Cross-Selling", "HAVING COUNT DISTINCT"],
  },
];

export const excelInterviewQuestions: InterviewQuestion[] = [
  {
    id: "excel-1",
    category: "excel",
    skillName: "Excel",
    difficulty: "Basic",
    title: "1. VLOOKUP vs. INDEX/MATCH vs. XLOOKUP",
    scenario: "The #1 Excel formula question asked across all corporate analyst screenings.",
    formulaSnippet: `-- Classic VLOOKUP (Searches only Left-to-Right, fragile to column index insertion):
=VLOOKUP(lookup_value, table_array, col_index_num, FALSE)

-- Robust INDEX/MATCH (Two-way lookup, works Right-to-Left, unaffected by column shifts):
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))

-- Modern XLOOKUP (Excel 365 / 2021+: Defaults to exact match, built-in IFERROR handling):
=XLOOKUP(lookup_value, lookup_array, return_array, "Not Found", 0)`,
    explanation: "XLOOKUP replaces both VLOOKUP and HLOOKUP. It searches in any direction (left/right/top/bottom), defaults to exact match (`0`), and provides an optional `[if_not_found]` argument eliminating the need to wrap formulas inside `IFERROR()`.",
    interviewerGotcha: "VLOOKUP breaks if a user inserts a new column in the source sheet because `col_index_num` is hardcoded. INDEX/MATCH and XLOOKUP refer directly to column ranges and adjust automatically.",
    tags: ["Lookups", "XLOOKUP", "VLOOKUP", "INDEX MATCH"],
  },
  {
    id: "excel-2",
    category: "excel",
    skillName: "Excel",
    difficulty: "Intermediate",
    title: "2. Multi-Criteria Aggregations: SUMIFS, COUNTIFS, AVERAGEIFS",
    scenario: "Aggregating sales by region, product, and specific date ranges.",
    formulaSnippet: `-- Calculate Total Q1 Sales for 'Electronics' in 'Hyderabad'
=SUMIFS(
  Sales_Amount_Range,
  Region_Range, "Hyderabad",
  Category_Range, "Electronics",
  Order_Date_Range, ">=2026-01-01",
  Order_Date_Range, "<=2026-03-31"
)`,
    explanation: "In SUMIFS, the `sum_range` is the VERY FIRST argument, followed by pairs of `criteria_range, criteria`. In the older single `SUMIF`, the sum_range was placed at the end. All conditions in SUMIFS operate as logical AND.",
    interviewerGotcha: "When concatenating dynamic cell references with comparison operators, remember the ampersand syntax: `\">=\" & A2`.",
    tags: ["SUMIFS", "Conditional Aggregations", "Formulas"],
  },
  {
    id: "excel-3",
    category: "excel",
    skillName: "Excel",
    difficulty: "Intermediate",
    title: "3. Pivot Tables: Calculated Fields vs. Calculated Items",
    scenario: "Creating custom ratios and margins inside Pivot Tables without modifying source data.",
    formulaSnippet: `-- Calculated Field: Operates on the SUM of individual columns
Profit_Margin = ('Profit' / 'Revenue')

-- Slicers & Timelines: Visual interactive filters linked across multiple Pivot Tables`,
    explanation: "• Calculated Field: Creates a new column metric derived from existing fields. It applies calculations to aggregated totals (`SUM(Profit) / SUM(Revenue)`).\n• Calculated Item: Creates a new row/item within an existing field (e.g. creating a custom region 'South India' = 'Hyderabad' + 'Bangalore').",
    interviewerGotcha: "Calculated Fields always sum before dividing. If you try to calculate an average of averages, a Calculated Field may produce skewed results unless configured correctly.",
    tags: ["Pivot Tables", "Calculated Fields", "Slicers", "Reporting"],
  },
  {
    id: "excel-4",
    category: "excel",
    skillName: "Excel",
    difficulty: "Basic",
    title: "4. Text Cleaning Functions: TRIM, CLEAN, PROPER, TEXTSPLIT",
    scenario: "Standardizing messy CSV imports and CRM customer data.",
    formulaSnippet: `-- Remove leading/trailing/extra spaces and capitalize properly:
=PROPER(TRIM(A2))

-- Split 'Firstname Lastname, City' into separate cells dynamically (Excel 365):
=TEXTSPLIT(A2, {",", " "})`,
    explanation: "`TRIM()` removes all leading, trailing, and duplicate spaces, leaving single spaces between words. `CLEAN()` strips non-printable ASCII characters often found in web scrapes. `TEXTSPLIT()` splits text across columns or rows using multiple delimiters.",
    interviewerGotcha: "`TRIM()` in Excel does NOT remove non-breaking spaces (ASCII 160, common in HTML copy-pastes). To fix that, use `=TRIM(SUBSTITUTE(A2, CHAR(160), \" \"))`.",
    tags: ["Data Cleaning", "Text Functions", "TRIM", "TEXTSPLIT"],
  },
  {
    id: "excel-5",
    category: "excel",
    skillName: "Excel",
    difficulty: "Advanced",
    title: "5. Dynamic Array Formulas: FILTER, UNIQUE, SORT, SORTBY",
    scenario: "Modern Excel formula architecture that automatically spills results across cells.",
    formulaSnippet: `-- Extract sorted, unique list of Active customers in Bangalore with spend > 10,000:
=SORT(
  UNIQUE(
    FILTER(Customer_Name_Range, (City_Range="Bangalore") * (Spend_Range > 10000) * (Status_Range="Active"), "No Records")
  )
)`,
    explanation: "Dynamic array functions return a multi-cell array that 'spills' into adjacent empty cells with the `#` spill operator. The asterisk `*` acts as boolean AND, while plus `+` acts as boolean OR.",
    interviewerGotcha: "If an adjacent cell contains existing data blocking the spill range, Excel returns a `#SPILL!` error.",
    tags: ["Dynamic Arrays", "FILTER", "UNIQUE", "Spill Range"],
  },
  {
    id: "excel-6",
    category: "excel",
    skillName: "Excel",
    difficulty: "Intermediate",
    title: "6. Conditional Formatting with Custom Formulas",
    scenario: "Highlighting overdue payments, top 10% performers, or weekend rows.",
    formulaSnippet: `-- Highlight rows where Status is 'Pending' AND Due Date is older than Today:
=AND($D2="Pending", $E2<TODAY())

-- Lock the column with $ ($D2) so the entire row highlights, not just the single cell!`,
    explanation: "To highlight an entire row across columns A through G, you MUST lock the column coordinate with a dollar sign (`$D2`) while keeping the row relative (`2`) so Excel evaluates each row independently.",
    interviewerGotcha: "Forgetting to anchor the column reference with `$` is the #1 mistake candidates make when styling full rows.",
    tags: ["Conditional Formatting", "Formulas", "UI Design in Excel"],
  },
  {
    id: "excel-7",
    category: "excel",
    skillName: "Excel",
    difficulty: "Advanced",
    title: "7. Power Query in Excel: Unpivoting Columns & Automated ETL",
    scenario: "Transforming wide monthly forecast reports into normalized tall relational tables.",
    formulaSnippet: `-- In Power Query Editor:
-- Select metadata columns (ID, Product) -> Right Click -> "Unpivot Other Columns"
-- Renames 'Attribute' to 'Month' and 'Value' to 'Revenue'
-- All steps recorded in M-code and refreshable with 1-click!`,
    explanation: "Power Query is Excel's native ETL engine. 'Unpivoting' transforms wide horizontal spreadsheets (e.g. Jan, Feb, Mar as separate column headers) into a tall, normalized 3-column table (`Product, Month, Sales`) ready for Pivot Table analysis.",
    interviewerGotcha: "Power Query transformations do not slow down workbook formula calculation because transformations execute only on explicit Data Refresh.",
    tags: ["Power Query", "ETL in Excel", "Unpivot", "M-Code"],
  },
  {
    id: "excel-8",
    category: "excel",
    skillName: "Excel",
    difficulty: "Intermediate",
    title: "8. Nested IF vs. IFS vs. SWITCH Statements",
    scenario: "Assigning customer loyalty tiers based on annual spend bands.",
    formulaSnippet: `-- Using IFS (Clean, no nested closing parentheses):
=IFS(
  Spend>=100000, "Platinum",
  Spend>=50000,  "Gold",
  Spend>=20000,  "Silver",
  TRUE,          "Bronze" -- Default fallback
)

-- Using SWITCH (Direct exact match mapping):
=SWITCH(Region_Code, "HYD", "Hyderabad", "BLR", "Bangalore", "Other")`,
    explanation: "`IFS()` evaluates multiple conditions in sequential order and returns the value corresponding to the first `TRUE` evaluation. Ending with `TRUE, \"Default\"` handles the fallback.",
    interviewerGotcha: "In `IFS()`, order conditions from highest threshold to lowest threshold; otherwise lower conditions will trigger first and short-circuit higher tiers.",
    tags: ["Logic Functions", "IFS", "SWITCH", "Formulas"],
  },
];

export const powerBiInterviewQuestions: InterviewQuestion[] = [
  {
    id: "pbi-1",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Basic",
    title: "1. Calculated Column vs. Measure in Power BI",
    scenario: "The single most common Power BI interview question.",
    formulaSnippet: `// Calculated Column (Row Context - Stored in RAM / Model file):
Tax_Amount = Fact_Sales[Unit_Price] * Fact_Sales[Tax_Rate]

// Measure (Filter Context - Calculated on-the-fly at query visual runtime):
Total_Tax_Collected = SUMX(Fact_Sales, Fact_Sales[Unit_Price] * Fact_Sales[Tax_Rate])`,
    explanation: "• Calculated Column: Computed during data refresh row-by-row and persisted into RAM / .pbix file storage. It increases model size.\n• Measure: Computed dynamically on-the-fly based on visual slicers and chart coordinates (Filter Context). Consumes zero persistent storage.",
    interviewerGotcha: "Always use Measures for aggregations and KPIs to keep Power BI models lightweight and performant.",
    tags: ["DAX Basics", "Measures vs Columns", "Evaluation Context", "Storage"],
  },
  {
    id: "pbi-2",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Advanced",
    title: "2. Filter Context vs. Row Context vs. Context Transition",
    scenario: "Assessing deep conceptual understanding of the DAX calculation engine (VertiPaq).",
    formulaSnippet: `// CALCULATE triggers Context Transition: converts Row Context into an equivalent Filter Context
Avg_Customer_Sales = 
AVERAGEX(
  Dim_Customer,
  CALCULATE(SUM(Fact_Sales[Sales_Amount])) -- Context transition filters Fact_Sales by current customer!
)`,
    explanation: "• Row Context: Knows which individual row is currently being evaluated (present in calculated columns and iterator functions like `SUMX`). Does NOT automatically filter other tables.\n• Filter Context: The active set of filters applied by slicers, report pages, row/column headers, and `CALCULATE()`.\n• Context Transition: When `CALCULATE()` is executed inside a Row Context, it automatically transforms that row context into an equivalent filter context.",
    interviewerGotcha: "Every measure automatically has an implicit `CALCULATE()` wrapped around it, which is why calling a measure inside `SUMX` triggers context transition automatically.",
    tags: ["DAX Engine", "Context Transition", "CALCULATE", "Advanced DAX"],
  },
  {
    id: "pbi-3",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Intermediate",
    title: "3. Star Schema vs. Snowflake Schema Data Modeling",
    scenario: "Data modeling architecture for high-performance Power BI reporting.",
    formulaSnippet: `-- Star Schema:
-- Central Fact Table (Fact_Sales) directly joined to 1-level Dimension Tables (Dim_Date, Dim_Customer, Dim_Product).
-- Single-direction (1-to-Many) relationships. Highly recommended by Microsoft & SQLBI.

-- Snowflake Schema:
-- Dimension tables are further normalized into sub-dimensions (Dim_Product -> Dim_SubCategory -> Dim_Category).
-- Requires extra relationship traversal and degrades VertiPaq compression.`,
    explanation: "Star Schema is the gold standard for Power BI. VertiPaq engine compresses denormalized dimension tables exceptionally well and eliminates relationship overhead during visual rendering.",
    interviewerGotcha: "Avoid Many-to-Many and Bi-Directional relationships wherever possible; they lead to ambiguous filter paths and severe performance degradation.",
    tags: ["Data Modeling", "Star Schema", "Snowflake Schema", "Relationships"],
  },
  {
    id: "pbi-4",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Intermediate",
    title: "4. Time Intelligence: Year-over-Year (YoY) Growth & YTD",
    scenario: "Used in executive sales dashboards (such as your Blinkit Sales project).",
    formulaSnippet: `// 1. Total Sales Measure
Total_Sales = SUM(Fact_Sales[Sales_Amount])

// 2. Prior Year Sales using SAMEPERIODLASTYEAR
Sales_Prior_Year = 
CALCULATE(
  [Total_Sales],
  SAMEPERIODLASTYEAR('Dim_Date'[Date])
)

// 3. YoY Growth Percentage
Sales_YoY_Growth_Pct = 
VAR CurrentSales = [Total_Sales]
VAR PriorSales = [Sales_Prior_Year]
RETURN 
DIVIDE(CurrentSales - PriorSales, PriorSales, 0)`,
    explanation: "Time Intelligence functions require a dedicated, continuous `Dim_Date` table marked as 'Date Table' with no gaps. `SAMEPERIODLASTYEAR()` shifts the current date filter context back exactly one year.",
    interviewerGotcha: "Always use `DIVIDE(numerator, denominator, 0)` instead of the forward slash `/` to avoid division-by-zero errors when prior period sales are zero.",
    tags: ["Time Intelligence", "DAX", "YoY Growth", "Blinkit Project"],
  },
  {
    id: "pbi-5",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Intermediate",
    title: "5. Filter Modifiers: ALL vs. ALLEXCEPT vs. ALLSELECTED",
    scenario: "Calculating contribution share (% of total sales across categories).",
    formulaSnippet: `// Sales as % of Total Category Sales
Category_Sales_Contribution = 
VAR CurrentCatSales = [Total_Sales]
VAR GrandTotalSales = CALCULATE([Total_Sales], ALL(Dim_Product[Category]))
RETURN 
DIVIDE(CurrentCatSales, GrandTotalSales, 0)

// ALLSELECTED respects external slicers while removing chart visual filters:
Visual_Share = DIVIDE([Total_Sales], CALCULATE([Total_Sales], ALLSELECTED()), 0)`,
    explanation: "• `ALL()`: Strips all filters from specified columns or tables, regardless of visual or slicer selections.\n• `ALLEXCEPT()`: Removes all filters except for specified columns.\n• `ALLSELECTED()`: Removes filters from the visual coordinates while preserving external page slicer filters.",
    interviewerGotcha: "Using `ALL()` on a table removes filters from the entire table, whereas `ALL(Table[Column])` only clears filters on that specific column.",
    tags: ["ALL", "ALLSELECTED", "Filter Modifiers", "Percentage of Total"],
  },
  {
    id: "pbi-6",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Advanced",
    title: "6. Active vs. Inactive Relationships & USERELATIONSHIP",
    scenario: "Handling multiple dates between tables (e.g. Order Date vs Ship Date).",
    formulaSnippet: `// Active relationship on OrderDate; Inactive relationship on ShipDate
Sales_By_Ship_Date = 
CALCULATE(
  [Total_Sales],
  USERELATIONSHIP(Fact_Orders[ShipDateKey], Dim_Date[DateKey])
)`,
    explanation: "Power BI permits only one active relationship between two tables to prevent ambiguous filter paths. `USERELATIONSHIP()` programmatically activates a secondary inactive relationship for the duration of a specific measure calculation.",
    interviewerGotcha: "You cannot create an inactive relationship if the data types of the two key columns do not match perfectly.",
    tags: ["USERELATIONSHIP", "Role-Playing Dimensions", "Data Modeling"],
  },
  {
    id: "pbi-7",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Intermediate",
    title: "7. DirectQuery vs. Import Mode vs. Dual Mode",
    scenario: "Architecting Power BI dataset storage modes based on data volume and latency requirements.",
    formulaSnippet: `-- Import Mode: Loads all data into VertiPaq in-memory columnar engine. Fastest visuals, max 1GB file limit (Pro), scheduled refreshes.
-- DirectQuery: Queries source database in real-time on visual interaction. Slower visuals, no file size limit, handles real-time IoT/banking streams.
-- Dual/Composite Mode: Caches dimension tables in Import mode while keeping massive fact tables in DirectQuery.`,
    explanation: "Import mode provides sub-second visual performance via in-memory columnar compression. DirectQuery translates visual clicks into real-time SQL queries against the underlying database.",
    interviewerGotcha: "Certain DAX functions (like complex time intelligence and parent-child hierarchies) are restricted or run slowly in DirectQuery mode.",
    tags: ["Storage Modes", "DirectQuery", "Import Mode", "Architecture"],
  },
  {
    id: "pbi-8",
    category: "powerbi",
    skillName: "Power BI & DAX",
    difficulty: "Advanced",
    title: "8. Row-Level Security (RLS) Implementation",
    scenario: "Restricting data visibility so regional managers only see their own territory's data.",
    formulaSnippet: `// Dynamic RLS DAX filter expression on Dim_Salesperson table:
[User_Email] = USERPRINCIPALNAME()`,
    explanation: "Dynamic RLS uses `USERPRINCIPALNAME()` to match the authenticated Power BI Service user's email against a security mapping table, ensuring each user only sees authorized data slices.",
    interviewerGotcha: "Workspace members with 'Admin', 'Member', or 'Contributor' roles bypass RLS by default. RLS applies only to users with the 'Viewer' role or external dashboard consumers.",
    tags: ["Row-Level Security", "RLS", "Governance", "Security"],
  },
];

export const pythonInterviewQuestions: InterviewQuestion[] = [
  {
    id: "py-1",
    category: "python",
    skillName: "Python & Pandas",
    difficulty: "Basic",
    title: "1. Loc vs. Iloc in Pandas",
    scenario: "The foundational indexing question asked in Python data analysis screenings.",
    codeSnippet: `import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'salary': [70000, 85000, 92000]
}, index=['emp_1', 'emp_2', 'emp_3'])

# loc: Label-based indexing (includes endpoint!)
print(df.loc['emp_1':'emp_2', 'salary'])

# iloc: Integer position-based indexing (0-indexed, excludes endpoint)
print(df.iloc[0:2, 1])`,
    explanation: "• `loc`: Selects rows and columns by text label. Slicing with `.loc['a':'c']` is INCLUSIVE of both endpoints.\n• `iloc`: Selects rows and columns by integer position (0, 1, 2...). Slicing with `.iloc[0:2]` is EXCLUSIVE of the upper bound.",
    interviewerGotcha: "If a DataFrame has an integer index that is not sorted (e.g. index=[3, 1, 2]), `df.loc[0:2]` searches for index labels 0 through 2, whereas `df.iloc[0:2]` takes the first 2 physical rows.",
    tags: ["Pandas", "Indexing", "loc vs iloc", "Python Basics"],
  },
  {
    id: "py-2",
    category: "python",
    skillName: "Python & Pandas",
    difficulty: "Intermediate",
    title: "2. GroupBy and Multiple Aggregations with Named Outputs",
    scenario: "Aggregating multi-metric summaries by department or product category.",
    codeSnippet: `import pandas as pd

# Group by Department and compute customized aggregations
dept_summary = df.groupby('department').agg(
    total_headcount=('employee_id', 'count'),
    avg_salary=('salary', 'mean'),
    max_bonus=('bonus', 'max'),
    median_experience=('experience_years', 'median')
).reset_index()

# Filter departments with average salary > 80,000
high_paying_depts = dept_summary[dept_summary['avg_salary'] > 80000]`,
    explanation: "Named aggregation `agg(new_col_name=('source_col', 'agg_func'))` creates a clean, flat single-index DataFrame without cumbersome MultiIndex column tuples.",
    interviewerGotcha: "Always remember to call `.reset_index()` after `groupby()` if you want the grouping column to remain as a standard DataFrame column rather than index labels.",
    tags: ["Pandas", "GroupBy", "Aggregation", "Data Manipulation"],
  },
  {
    id: "py-3",
    category: "python",
    skillName: "Python & Pandas",
    difficulty: "Intermediate",
    title: "3. Handling Missing Data: isna(), fillna(), dropna(), and interpolate()",
    scenario: "Data cleaning and imputation before building models or charts.",
    codeSnippet: `import pandas as pd

# 1. Identify % of missing values per column
missing_pct = df.isna().mean() * 100

# 2. Impute numeric columns with median (robust against outliers)
df['salary'] = df['salary'].fillna(df['salary'].median())

# 3. Forward fill for time-series data
df['stock_price'] = df['stock_price'].ffill()

# 4. Drop rows where critical identifier is missing
df = df.dropna(subset=['customer_id'])`,
    explanation: "Choosing the right imputation strategy depends on data type: categorical variables use mode or `'Unknown'`, numeric skewed variables use median, and time-series data uses `.ffill()` (forward fill) or linear interpolation.",
    interviewerGotcha: "Never blindly impute with `.mean()` on skewed variables without first checking for extreme outliers.",
    tags: ["Data Cleaning", "Missing Values", "Imputation", "Pandas"],
  },
  {
    id: "py-4",
    category: "python",
    skillName: "Python & Pandas",
    difficulty: "Advanced",
    title: "4. Merging & Reshaping: merge(), pivot_table(), and melt()",
    scenario: "Combining transactional datasets and reshaping wide vs tall formats.",
    codeSnippet: `import pandas as pd

# Merge (equivalent to SQL JOIN)
merged_df = pd.merge(orders_df, customers_df, on='customer_id', how='left')

# Pivot Table: Wide format (Months as columns)
pivot_df = df.pivot_table(
    index='region',
    columns='quarter',
    values='revenue',
    aggfunc='sum',
    fill_value=0
)

# Melt: Tall format (Unpivoting wide format back to tabular)
tall_df = pd.melt(
    pivot_df.reset_index(),
    id_vars=['region'],
    value_vars=['Q1', 'Q2', 'Q3', 'Q4'],
    var_name='quarter',
    value_name='revenue'
)`,
    explanation: "`pivot_table()` aggregates and reshapes tall data into wide matrices, while `melt()` does the reverse (unpivoting wide data into tall tabular format).",
    interviewerGotcha: "If duplicate index-column combinations exist, `df.pivot()` will throw a `ValueError`, whereas `df.pivot_table()` will aggregate them cleanly using `aggfunc`.",
    tags: ["Pandas", "Reshaping", "Pivot Table", "Melt", "Merge"],
  },
  {
    id: "py-5",
    category: "python",
    skillName: "Python & Pandas",
    difficulty: "Intermediate",
    title: "5. Vectorization vs. Apply vs. Iterrows (Performance Optimization)",
    scenario: "Why iterating over rows in Python is 100x-1000x slower than vectorized operations.",
    codeSnippet: `import numpy as np

# ❌ Slowest: iterrows() loops in Python bytecode
# ⚠️ Moderate: df['col'].apply(lambda x: ...)

#  Fastest: NumPy Vectorization (Executes in C at CPU level)
df['discounted_price'] = np.where(
    df['customer_tier'] == 'Gold',
    df['price'] * 0.85,
    df['price']
)`,
    explanation: "Vectorized operations in Pandas and NumPy delegate computations to compiled C/Fortran code, leveraging SIMD (Single Instruction, Multiple Data) CPU registers rather than running slow Python interpreter loops.",
    interviewerGotcha: "Mentioning `np.where()` or `np.select()` over Python for-loops demonstrates senior-level performance awareness.",
    tags: ["Vectorization", "NumPy", "Optimization", "Performance"],
  },
  {
    id: "py-6",
    category: "python",
    skillName: "Python & Pandas",
    difficulty: "Intermediate",
    title: "6. Datetime Extraction & Time Series Resampling",
    scenario: "Analyzing daily order volume trends and weekly seasonality.",
    codeSnippet: `import pandas as pd

# Convert string timestamps to datetime objects
df['order_date'] = pd.to_datetime(df['order_date'])

# Extract calendar attributes
df['day_name'] = df['order_date'].dt.day_name()
df['month'] = df['order_date'].dt.month
df['year_month'] = df['order_date'].dt.to_period('M')

# Resample daily data to weekly total revenue
weekly_revenue = df.set_index('order_date')['revenue'].resample('W').sum()`,
    explanation: "The `.dt` accessor provides fast access to calendar properties. `.resample('W')` acts like a time-aware `GROUP BY` bucket for continuous time intervals.",
    interviewerGotcha: "Always verify timezone formatting when working with UTC timestamps (`tz_localize` vs `tz_convert`).",
    tags: ["Datetime", "Time Series", "Pandas", "Resample"],
  },
];

export const businessStatsInterviewQuestions: InterviewQuestion[] = [
  {
    id: "stat-1",
    category: "business_stats",
    skillName: "Statistics & Business Case",
    difficulty: "Intermediate",
    title: "1. Diagnosing a Metric Drop: 'E-commerce Revenue Dropped 10% Last Week — How Do You Investigate?'",
    scenario: "The gold-standard product case study question asked by Swiggy, Blinkit, and Amazon.",
    explanation: `Structured 4-Step Diagnostic Framework:
1. **Clarification & Verification:**
   - Is the drop real or a data pipeline glitch (ETL failure, missing tracking tags, timezone shift)?
   - Is it compared against the previous week (WoW) or the same week last year (YoY seasonality)?

2. **Deconstruct Revenue Equation:**
   - Revenue = (Total Traffic / Visitors) × (Conversion Rate %) × (Average Order Value [AOV])
   - If Traffic dropped -> Marketing campaign issue, App crash/bug, SEO/Organic drop.
   - If Conversion dropped -> Payment gateway downtime, Cart UI bug, Price increase.
   - If AOV dropped -> Discount reduction, Item out-of-stock, Basket mix shift.

3. **Segment by Dimensions:**
   - By Geography: Did it happen only in Hyderabad/Bangalore or nationwide?
   - By Platform: iOS vs Android vs Web (often reveals app version bugs).
   - By Category: Did Grocery drop while Electronics stayed flat?
   - By User Cohort: New users vs Repeat loyal customers.

4. **Formulate Hypotheses & Action Plan:**
   - Pinpoint root cause (e.g. 'Android App v4.2 checkout crash in South region') and share findings with Engineering & Product Leads.`,
    interviewerGotcha: "Never guess a single random cause ('Maybe people had a holiday?'). Always walk through the systematic tree decomposition.",
    tags: ["Root Cause Analysis", "Case Study", "Product Sense", "E-Commerce"],
  },
  {
    id: "stat-2",
    category: "business_stats",
    skillName: "Statistics & Business Case",
    difficulty: "Intermediate",
    title: "2. A/B Testing Fundamentals: P-Values, Sample Size, and Type I/II Errors",
    scenario: "Testing checkout button color or discount banner changes.",
    explanation: `Key A/B Testing Principles:
• **Null Hypothesis (H0):** The new feature has NO effect on conversion rate.
• **Alternative Hypothesis (H1):** The new feature statistically significantly changes conversion.
• **P-Value:** The probability of observing this result by pure random chance if the Null Hypothesis were true. Benchmark threshold is typically p < 0.05 (5% significance level).
• **Type I Error (False Positive):** Declaring a winner when there is actually no real difference (controlled by alpha α = 0.05).
• **Type II Error (False Negative):** Failing to detect a real difference (controlled by statistical power 1 - β = 0.80).
• **Sample Size:** Determined by Minimum Detectable Effect (MDE), baseline conversion rate, and statistical power before launching the test.`,
    interviewerGotcha: "Never stop an A/B test early just because it looks significant after 2 days (the 'peeking problem'). Run it for at least 1-2 full business cycles (e.g. 7-14 days) to account for day-of-week seasonality.",
    tags: ["A/B Testing", "Hypothesis Testing", "P-Value", "Statistics"],
  },
  {
    id: "stat-3",
    category: "business_stats",
    skillName: "Statistics & Business Case",
    difficulty: "Basic",
    title: "3. Essential Business Metrics: CAC, LTV, Churn, AOV, and Gross Margin",
    scenario: "Defining commercial metrics for SaaS, E-Commerce, and FinTech.",
    explanation: `Core Commercial Formulas:
• **Customer Acquisition Cost (CAC):** Total Sales & Marketing Spend / Total New Customers Acquired.
• **Customer Lifetime Value (LTV / CLV):** (Average Order Value × Purchase Frequency × Gross Margin %) / Churn Rate.
• **Healthy LTV : CAC Ratio:** Standard healthy benchmark is ≥ 3 : 1.
• **Churn Rate %:** (Customers Lost during Period / Customers at Start of Period) × 100.
• **Net Promoter Score (NPS):** % Promoters (Score 9-10) - % Detractors (Score 0-6). Range: -100 to +100.`,
    interviewerGotcha: "Differentiate between Customer Churn (% of users lost) and Revenue Churn (% of recurring revenue lost).",
    tags: ["Business Metrics", "LTV CAC", "Churn", "Commercial Sense"],
  },
];
