import React from "react";
import { InterviewMasterHub } from "./InterviewMasterHub";

interface InterviewPrepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewPrepModal: React.FC<InterviewPrepModalProps> = ({ isOpen, onClose }) => {
  return <InterviewMasterHub isOpen={isOpen} onClose={onClose} />;
};
export default InterviewPrepModal;
