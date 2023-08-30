import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">
        <Routes />
        <ToastContainer position="top-center" />
      </main>
    </>
  );
}

export default App;
