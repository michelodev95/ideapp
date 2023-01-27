import React, { useEffect, useRef, useState } from "react";
import {
  AiFillEdit,
  AiOutlineDelete,
  AiFillEye,
  AiOutlineSearch,
} from "react-icons/ai";
import Modal from "./modals/Modal";
import ModalIdea from "./modals/ModalIdea";
import ModalSearch from "./modals/ModalSearch";

const IdeaList = ({ ideas, setIdeas, setEditIdea }) => {
  const [open, setOpen] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 340) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);
  const bottomToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const idIdea = useRef();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    nameIdea: "",
  });
  const [display, setDisplay] = useState({
    title: "",
    description: "",
    isLoading: false,
    ideaDate: "",
  });
  const handleDialog = (message, isLoading, nameIdea) => {
    setDialog({
      message,
      isLoading,
      nameIdea,
    });
  };

  const handleDisplay = (title, description, isLoading, ideaDate) => {
    setDisplay({
      title,
      description,
      isLoading,
      ideaDate,
    });
  };

  const handleShow = (id) => {
    const index = ideas.findIndex((idea) => idea.id === id);
    handleDisplay(
      ideas[index].title,
      ideas[index].description,
      true,
      ideas[index].ideaDate
    );
    idIdea.current = id;
  };

  const handleDelete = (id) => {
    const index = ideas.findIndex((idea) => idea.id === id);

    handleDialog("Are you sure you want to delete?", true, ideas[index].title);
    idIdea.current = id;
  };

  const closeInfo = () => {
    handleDisplay("", false);
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      setIdeas(ideas.filter((idea) => idea.id !== idIdea.current));
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const handleEdit = ({ id }) => {
    const findIdea = ideas.find((idea) => idea.id === id);
    bottomToTop();
    setEditIdea(findIdea);
    return {};
  };

  return (
    <>
      <div className="mb-4">
        <div className="items-center">
          {ideas.length === 0 ? (
            <h1 className="text-white font-bold mt-6 text-center text-sm">
              there's no ideas 😕
            </h1>
          ) : (
            <div className="flex justify-between text-xl items-center">
              <h1 className="text-white mt-6 text-center text-base">
                {ideas.length}
                {ideas.length === 1 ? " idea" : " ideas"}
              </h1>
              <button
                className="text-white mt-6 border-2 border-blue-400 rounded-md p-1"
                onClick={() => setOpen(true)}
              >
                <AiOutlineSearch />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 lg:grid lg:mt-0 lg:grid-cols-3 lg:gap-x-6 md:grid md:top-0 md:grid-cols-2 md:gap-x-4">
        {ideas
          .slice(0)
          .reverse()
          .map((idea) => (
            <div className="max-h-full mb-8 mt-2 lg:mt-0 md:mt-0" key={idea.id}>
              {/* <div className="w-full bg-white lg:h-0 h-0.5 mb-4"></div> */}
              <div className="bg-white rounded-sm p-4 mt-4">
                {idea.title.length > 20 ? (
                  <h2
                    className="font-bold text-sm text-black text-center mb-1 uppercase"
                    onChange={(e) => e.preventDefault()}
                  >
                    {idea.title.slice(0, 20)}...
                  </h2>
                ) : (
                  <h2
                    className="font-bold text-sm text-black text-center mb-1 uppercase"
                    onChange={(e) => e.preventDefault()}
                  >
                    {idea.title}
                  </h2>
                )}
                <textarea
                  className="text-black w-full h-16"
                  value={idea.description}
                  onChange={(e) => e.preventDefault()}
                />
                <div
                  onClick={() => handleShow(idea.id)}
                  className="relative text-xl mt-6 cursor-pointer"
                >
                  <AiFillEye className="text-gray-600 absolute bottom-0 right-0" />
                  <h3 className="text-gray-500 text-xs">
                    {idea.ideaDate ? idea.ideaDate.toString().slice(0, 16) : ""}
                  </h3>
                </div>
              </div>

              <div className="flex justify-around gap-x-2">
                <button
                  className="flex w-full items-center justify-center rounded-md mt-2 px-8 bg-blue-900 cursor-pointer"
                  onClick={() => handleEdit(idea)}
                >
                  <AiFillEdit className="w-4 h-8 text-white" />
                </button>

                <button
                  className="flex w-full items-center px-8 justify-center rounded-md mt-2 bg-red-600 cursor-pointer"
                  onClick={() => handleDelete(idea.id)}
                >
                  <AiOutlineDelete className="w-4 h-8 text-white" />
                </button>
              </div>
            </div>
          ))}

        {dialog.isLoading && (
          <div className="flex mx-auto justify-center items-center overflow-hidden">
            <Modal
              onAction={areUSureDelete}
              message={dialog.message}
              nameIdea={dialog.nameIdea}
            />
          </div>
        )}
        {display.isLoading && (
          <div className="flex mx-auto justify-center items-center overflow-hidden">
            <ModalIdea
              onAction={closeInfo}
              title={display.title}
              description={display.description}
              date={display.ideaDate ? display.ideaDate.toString() : ""}
            />
          </div>
        )}
        {open && (
          <div className="flex mx-auto justify-center items-center overflow-hidden">
            <ModalSearch
              openModal={setOpen}
              ideas={ideas.map((i) => i.title)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default IdeaList;
