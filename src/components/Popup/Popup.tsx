import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Popup.module.css";

type Props = {
  onClose: () => void;
};

const Popup: React.FC<Props> = ({ onClose }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <h1 className={css.question}>
          Are you sure that you want to delete your profile?
        </h1>
        <div className={css.buttonWrapper}>
          <button type="button">Yes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
};

export default Popup;
