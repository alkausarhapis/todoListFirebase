import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen text-center bg-slate-800">
      <TodoList />
      <footer className="mb-1 text-slate-600">
        Designed and built by{" "}
        <a className="underline" href="https://portfolio-hapis.vercel.app">
          Hapis
        </a>
      </footer>
    </div>
  );
}

export default App;
