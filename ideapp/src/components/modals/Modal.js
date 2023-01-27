import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ message, onAction, nameIdea }) => {
  const [open, setOpen] = useState(true);
  open
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
  const bgFix = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
    onAction(false);
  };

  return (
    <div className="fixed top-0 esconder bg-black bg-opacity-50 w-screen h-screen z-50 overflow-auto p-4 overflow-x-hidden overflow-y-hidden md:inset-0 md:h-full">
      <div className="w-full h-full max-w-md md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <span className="text-3xl cursor-pointer" onClick={() => bgFix()}>
              <AiOutlineCloseCircle />
            </span>
          </button>
          <div className="p-6 text-center">
            <h3 className="text-4xl mt-5">😕</h3>
            <h3 className="mb-2 text-lg font-normal text-gray-500">
              {message}
            </h3>

            {nameIdea.length < 15 ? (
              <h3 className="mb-5 uppercase text-lg font-bold text-gray-500">
                {nameIdea}
              </h3>
            ) : (
              <h3 className="mb-5 uppercase text-lg font-bold text-gray-500">
                {nameIdea.slice(0, 15)}...
              </h3>
            )}

            <button
              onClick={() => onAction(true)}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 cursor-pointer"
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              onClick={() => bgFix()}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 cursor-pointer"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
