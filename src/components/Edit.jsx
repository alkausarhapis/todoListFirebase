import React, { useState } from "react";

const Edit = ({ editTask, task }) => {
  const [todos, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // cancel edit
    if (!todos.trim()) {
      setTodo(task.task);
      return;
    }
    editTask(todos, task.id);
    setTodo("");
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Update ur task"
        className="outline-none p-3 bg-transparent border-2 border-slate-700 w-[310px] text-slate-700"
        onChange={(e) => setTodo(e.target.value)}
        value={todos}
      />
      <button className="p-3 border-2 bg-slate-700 border-slate-700 text-slate-300">
        Edit
      </button>
    </form>
  );
};

export default Edit;
