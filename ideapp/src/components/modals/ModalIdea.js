import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ModalIdea = ({ title, onAction, description, date }) => {
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
    <div className="fixed top-0 bg-black bg-opacity-50 w-screen h-screen z-50 p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-modal md:h-full">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div>
          <div className="px-8 pt-6 md:shrink-0 text-4xl text-center justify-between">
            <div className="flex justify-between items-center">
              <span>🧠</span>
              <p className="text-sm">{date}</p>
              <button
                className="text-3xl cursor-pointer text-gray-500"
                onClick={() => bgFix()}
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
          </div>
          <div className="grid p-8 md:shrink-0 text-left">
            <h3 className="uppercase tracking-wide text-xl mt-2 text-indigo-900 font-semibold">
              {title}
            </h3>
            <textarea
              className="mt-6 text-lg text-slate-500 h-96"
              value={description}
              onChange={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalIdea;
