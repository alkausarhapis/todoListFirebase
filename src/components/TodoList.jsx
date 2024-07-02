import React, { useEffect, useState } from "react";
import Form from "./Form";
import Todos from "./Todos";
import Edit from "./Edit";
import TodoDone from "./TodoDone";
import { db } from "../config/firebase";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const TodoList = () => {
  const [todoVal, setTodo] = useState([]);

  // read todo
  useEffect(() => {
    const qry = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(qry, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Createtodo
  const createTodo = (todo) => {
    addDoc(collection(db, "todos"), {
      task: todo,
      isEditing: false,
      isDone: false,
    });
  };

  // Delete todo
  const deleteTodo = (id) => {
    // setTodo(todoVal.filter((todo) => todo.id !== id));
    deleteDoc(doc(db, "todos", id));
  };

  // ediTodo trigger
  const editTodo = (todo) => {
    // setTodo(
    //   todoVal.map((todo) =>
    //     todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    //   )
    // );
    updateDoc(doc(db, "todos", todo.id), {
      isEditing: !todo.isEditing,
    });
  };

  // edittodo edit form
  const editTask = (task, id) => {
    updateDoc(doc(db, "todos", id), {
      task: task,
      isEditing: false,
    });
  };

  const checkTodo = (id) => {
    const todo = todoVal.find((todo) => todo.id === id);
    if (todo) {
      updateDoc(doc(db, "todos", todo.id), {
        isDone: !todo.isDone,
      });
    }
  };

  const activeTodos = todoVal.filter((todo) => !todo.isDone);
  const doneTodos = todoVal.filter((todo) => todo.isDone);

  return (
    <div>
      <h1 className="pt-3 text-4xl font-bold text-gray-300 font-primary mb-7">
        Todo List
      </h1>

      <Form createTodo={createTodo} />

      {todoVal.length > 0 ? (
        <div className="container mt-10 w-[400px] p-3 flex items-center flex-col bg-slate-400 max-h-[62vh] overflow-y-scroll thin-scrollbar no-scrollbar-x">
          {activeTodos.map((todo, idx) =>
            todo.isEditing ? (
              <Edit key={idx} editTask={editTask} task={todo} />
            ) : (
              <Todos
                task={todo}
                key={idx}
                checkTodo={checkTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )
          )}
          {doneTodos.length > 0 && (
            <h2 className="mt-2 mb-1 text-lg font-semibold w-[100%] text-left">
              Done
            </h2>
          )}
          {doneTodos.map((todo, idx) =>
            todo.isEditing ? (
              <Edit key={idx} editTask={editTask} task={todo} />
            ) : (
              <TodoDone
                task={todo}
                key={idx}
                checkTodo={checkTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )
          )}
        </div>
      ) : (
        <p className="text-gray-500">No task available</p>
      )}
    </div>
  );
};

export default TodoList;
