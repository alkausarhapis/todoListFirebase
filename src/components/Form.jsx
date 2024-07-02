import React, { useState } from "react";

const Form = ({ createTodo }) => {
  const [todos, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todos === "") {
      return;
    }

    createTodo(todos);
    setTodo("");
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        className="outline-none p-2 bg-transparent border-2 border-gray-300 w-[350px] text-gray-200"
        onChange={(e) => setTodo(e.target.value)}
        value={todos}
      />
      <button className="p-2 bg-gray-300 border-2 border-gray-300">Add</button>
    </form>
  );
};

export default Form;
