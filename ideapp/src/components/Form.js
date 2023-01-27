import React, { useEffect } from "react";
import { v1 as uuidv4 } from "uuid";

const Form = ({
  input,
  setInput,
  title,
  setTitle,
  ideas,
  setIdeas,
  editIdea,
  setEditIdea,
  ideaDate,
  setDate,
}) => {
  // TODO Create the * Complete * Function
  const updateIdea = (title, description, id, completed, ideaDate) => {
    const newIdea = ideas.map((idea) =>
      idea.id === id ? { description, title, id, completed, ideaDate } : idea
    );
    setIdeas(newIdea);
    setEditIdea("");
  };
  useEffect(() => {
    if (editIdea) {
      setInput(editIdea.description);
      setTitle(editIdea.title);
      setDate(editIdea.ideaDate);
    } else {
      setInput("");
      setTitle("");
    }
  }, [setInput, setTitle, editIdea, setDate]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onInputChange = (f) => {
    setInput(f.target.value);
  };

  const onFormSubmit = (e) => {
    const date = new Date();
    const formatDate = date.toLocaleString();
    e.preventDefault();
    if (!editIdea) {
      setIdeas([
        ...ideas,
        {
          id: uuidv4(),
          description: input,
          title: title,
          complete: false,
          ideaDate: formatDate,
        },
      ]);
      setTitle("");
      setInput("");
      setDate(formatDate);
    } else {
      updateIdea(title, input, editIdea.id, editIdea.completed, ideaDate);
    }
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="grid">
          <div>
            <h2 className="text-white font-bold mb-2 text-lg">Title</h2>
            <input
              type="text"
              className="block w-full p-2 pl-4
            text-sm text-gray-900 rounded-sm bg-gray-50 "
              placeholder="(max 35 letters)"
              required
              value={title}
              onChange={onTitleChange}
              maxLength="35"
            />
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-white font-bold text-lg">Description</h2>
            <textarea
              type="text"
              className="w-full p-4
              text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 "
              placeholder="open your mind 🤯"
              required
              value={input}
              onChange={onInputChange}
            />
          </div>
          <div className="mt-2">
            {editIdea ? (
              <h3 className="text-white text-sm text-center">
                I'ts time for changes...🤔
              </h3>
            ) : null}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className={`w-full ${
                editIdea ? "bg-green-700" : "bg-blue-800"
              } text-center text-white p-2 rounded-md`}
            >
              {editIdea ? "Edit idea" : "Add idea"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
