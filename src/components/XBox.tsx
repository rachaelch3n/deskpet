import React from "react";

interface XBoxProps {
  onClick: () => void;
}

const XBox: React.FC<XBoxProps> = ({ onClick }) => {
  return (
    <button
      className="xbox-button"
        onClick={onClick}
    >
      ✕
    </button>
  );
};

export default XBox;
