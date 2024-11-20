import React from "react";
import { IconX } from "@tabler/icons-react";

function Modal({ open, onClose, children }) {
  function remove() {
    localStorage.removeItem("totalPrice");
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 flex items-center justify-center transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`rounded-lg bg-white p-6 shadow transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-lg p-1"
          >
            <IconX />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
