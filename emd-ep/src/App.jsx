import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Navbar from "./components/navbar";
import Home from "./components/home";

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <div className="w-16 h-16 bg-red-500"></div>

      <Home />
    </BrowserRouter>
  );
}

export default App;