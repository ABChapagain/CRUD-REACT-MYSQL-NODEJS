import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="top-right"
          hideProgressBar="true"
          autoClose={2000}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addPerson" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
