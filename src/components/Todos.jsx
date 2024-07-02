import React from "react";
import { BiCheckbox, BiEdit, BiTrash } from "react-icons/bi";

const Todos = ({ task, deleteTodo, editTodo, checkTodo }) => {
  return (
    <div className="flex items-center justify-between w-[375px] px-2 py-3 mb-[13px] text-slate-300 bg-slate-800 cursor-pointer hover:opacity-75">
      <div className="flex items-center gap-x-1">
        <BiCheckbox className="text-3xl" onClick={() => checkTodo(task.id)} />
        <p className="font-primary text-ellipsis truncate max-w-[150px]">
          {task.task}
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        <BiEdit className="text-2xl" onClick={() => editTodo(task)} />
        <BiTrash className="text-2xl" onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

export default Todos;
