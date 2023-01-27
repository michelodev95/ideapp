import React, { useMemo, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

const ModalSearch = ({ ideas, openModal }) => {
  const [open, setOpen] = useState(true);
  open
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
  const Action = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
    openModal(false);
  };
  const [idea, setIdea] = useState(ideas);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return idea.filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [idea, query]);

  return (
    <div className="fixed top-0 bg-black bg-opacity-50 w-screen h-screen z-50 p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-modal md:h-full">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div>
          <div className="flex px-8 pt-6 md:shrink-0 text-4xl text-center justify-between">
            <span>🧐</span>
            <button
              className="text-3xl cursor-pointer text-gray-500"
              onClick={() => Action()}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
          <form className="px-4 pt-6 mb-8">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiOutlineSearch className="text-xl" />
              </div>
              <input
                type="search"
                id="default-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search your idea..."
                required
              />
            </div>
          </form>
          <div className="mb-10 ml-6 font-bold uppercase">
            {filteredItems.map((item) => (
              <div key={item}>
                {query ? <h3 className="py-4 text-lg">● 🧠 {item}</h3> : null}
              </div>
            ))}
          </div>
          <p className="text-xs text-center mx-6 mb-6">
            In this search engine you can only find the title of your ideas. If
            you want to see all the content of your idea, click on the 👁️ that
            appears on each created idea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalSearch;
