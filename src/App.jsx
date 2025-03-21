import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./assets/components/navbar/Navbar";
import Home from "./pages/home/Home";
import Country from "./pages/country/Country";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [appis, setAppis] = useState([]);

  const getData = async (link) => {
    try {
      const req = await fetch(link);
      const data = await req.json();
      setAppis(data);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  useEffect(() => {
    getData("https://restcountries.com/v3.1/all");
  }, []);

  return (
    <BrowserRouter>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/" element={<Home appis={appis} isDarkMode={isDarkMode} />} />
       
        <Route path="/country/:id" element={<Country appis={appis} isDarkMode={isDarkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


