import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import "./todoApp.style.css";

function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  async function getTodos(db) {
    try {
      const todosCollection = collection(db, "todos");
      const todosSnapshot = await getDocs(todosCollection);
      const todoList = todosSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTodoList(todoList);
    } catch (err) {
      enqueueSnackbar("Something went wrong. Try again later", {
        variant: "error",
      });
    }
  }

  useEffect(() => {
    getTodos(db);
  }, []);

  const addTodo = async () => {
    try {
      if (!todo) {
        enqueueSnackbar("Todo cant be empty", { variant: "warning" });
        return;
      }
      await addDoc(collection(db, "todos"), {
        todoText: todo,
        isCompleted: false,
      });
      setTodo("");
      enqueueSnackbar("your todo item is added", {
        variant: "success",
      });
      await getTodos(db);
    } catch (err) {
      enqueueSnackbar("Sth went wrong", { variant: "error" });
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      console.log("todo ID", todoId);
      await deleteDoc(doc(db, "todos", todoId));
      enqueueSnackbar("todo was succesfully deleted", { variant: "success" });
      getTodos(db);
    } catch (err) {
      enqueueSnackbar("sth went wrong", { variant: "error" });
    }
  };

  const onCheckClicked = async (todoId) => {
    try {
      console.log("todo id ", todoId);
      const todoRef = doc(db, "todos", todoId);
      await setDoc(todoRef, { isCompleted: true }, { merge: true });
      await getTodos(db);
    } catch (err) {
      enqueueSnackbar("sth went wrong, try again", { variant: "error" });
    }
  };

  const onChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input name="todo" onChange={onChangeHandler} value={todo} />
      <button onClick={addTodo}>Add</button>
      <div>
        {todoList.map((el, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "#eeee",
                width: "50%",
                margin: "20px auto",
              }}
            >
              <input
                type="checkbox"
                checked={el.isCompleted}
                onChange={() => onCheckClicked(el.id)}
              />
              <span style={{ fontSize: "10px", marginRight: "50px" }}>
                {el.todoText}
              </span>
              <button onClick={() => deleteTodo(el.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoApp;
