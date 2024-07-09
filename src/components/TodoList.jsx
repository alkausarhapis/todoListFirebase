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
    // Membuat query untuk koleksi "todos"
    const qry = query(collection(db, "todos"));

    // Menyetel pendengaran real-time pada query
    const unsubscribe = onSnapshot(qry, (querySnapshot) => {
      let todosArr = [];
      // Mengumpulkan data dari setiap dokumen dalam snapshot
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      // Memperbarui state dengan data terbaru
      setTodo(todosArr);
    });

    // Mengembalikan fungsi unsubscribe untuk menghentikan pendengaran saat komponen di-unmount
    return () => unsubscribe();
  }, []);

  // Createtodo
  // const createTodo = (todo) => {
  //   addDoc(collection(db, "todos"), {
  //     task: todo,
  //     isEditing: false,
  //     isDone: false,
  //   });
  // };
  const createTodo = async (todo) => {
    try {
      await addDoc(collection(db, "todos"), {
        task: todo,
        isEditing: false,
        isDone: false,
      });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Delete todo
  // const deleteTodo = (id) => {
  //   // setTodo(todoVal.filter((todo) => todo.id !== id));
  //   deleteDoc(doc(db, "todos", id));
  // };
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // ediTodo trigger
  // const editTodo = (todo) => {
  //   // setTodo(
  //   //   todoVal.map((todo) =>
  //   //     todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
  //   //   )
  //   // );
  //   updateDoc(doc(db, "todos", todo.id), {
  //     isEditing: !todo.isEditing,
  //   });
  // };
  const editTodo = async (todo) => {
    try {
      await updateDoc(doc(db, "todos", todo.id), {
        isEditing: !todo.isEditing,
      });
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // edittodo edit form
  // const editTask = (task, id) => {
  //   updateDoc(doc(db, "todos", id), {
  //     task: task,
  //     isEditing: false,
  //   });
  // };
  const editTask = async (task, id) => {
    try {
      await updateDoc(doc(db, "todos", id), {
        task: task,
        isEditing: false,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // const checkTodo = (id) => {
  //   const todo = todoVal.find((todo) => todo.id === id);
  //   if (todo) {
  //     updateDoc(doc(db, "todos", todo.id), {
  //       isDone: !todo.isDone,
  //     });
  //   }
  // };

  const checkTodo = async (id) => {
    const todo = todoVal.find((todo) => todo.id === id);
    if (todo) {
      try {
        await updateDoc(doc(db, "todos", todo.id), {
          isDone: !todo.isDone,
        });
      } catch (error) {
        console.error("Error updating todo status:", error);
      }
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
