import React, { useState, useEffect } from "react";
import Form from "./Form";
import Header from "./Header";
import IdeaList from "./IdeaList";

const Home = () => {
  const initialState = JSON.parse(localStorage.getItem("ideas")) || [];
  const [ideas, setIdeas] = useState(initialState);
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [ideaDate, setDate] = useState();

  const [editIdea, setEditIdea] = useState(null);

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  document.body.style.overflow = "auto";

  return (
    <div>
      <div className="lg:flex lg:items-center lg:h-max lg:py-20 lg:w-full md:flex md:py-20 md:items-center md:w-fit md:gap-x-12 justify-around bg-[#0e2545] my-12 w-80 p-4 rounded-xl mx-auto">
        <div className="lg:grid md:grid">
          <div className="">
            <Header />
            <p className="mt-4 mb-4 text-center text-white">
              Write here all your ideas and let your imagination run wild.
            </p>
          </div>

          <div>
            <Form
              input={input}
              setTitle={setTitle}
              setInput={setInput}
              title={title}
              ideas={ideas}
              setIdeas={setIdeas}
              editIdea={editIdea}
              setEditIdea={setEditIdea}
              ideaDate={ideaDate}
              setDate={setDate}
            />
          </div>
        </div>
        <div
          className={`${
            ideas.length > 0
              ? "md:border-dotted lg:border-dotted lg:h-96 lg:w-fit md:h-96 md:w-fit md:overflow-auto lg:rounded-xl lg:border-2 lg:p-4 md:rounded-xl md:border-2 md:p-4"
              : ""
          }`}
        >
          <IdeaList
            ideas={ideas}
            setIdeas={setIdeas}
            setEditIdea={setEditIdea}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
