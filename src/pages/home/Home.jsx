import React, { useState, useEffect } from "react";
import "./Home.css";
import { IoSearch } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home({ appis, isDarkMode }) {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Har safar sahifa yuklanganda yuqoriga skroll qilish
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 🔎 Filterlangan mamlakatlar ro‘yxati (search + region)
  const filteredCountries = appis.filter((item) => {
    const matchesSearch = item.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "" || item.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className={isDarkMode ? "home_bg active" : "home_bg"}>
      <div className="container">
        <div className="inputs">
          <div className="input1">
            <IoSearch />
            <input
              type="text"
              placeholder="Search for a country…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="contry_cards">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((item, index) => (
              <Link
                to={`/country/${item.cca3}`}
                key={index}
                onClick={() => window.scrollTo(0, 0)} // 📌 Sahifa yuqoriga ko‘tariladi
              >
                <div className="contry_card">
                  <img src={item.flags.png} alt={item.name.common} />
                  <h2>
                    {item.name.common.length > 15
                      ? `${item.name.common.slice(0, 15)}...`
                      : item.name.common}
                  </h2>
                  <div className="contry_text">
                    <h3>
                      Population: <span>{item.population.toLocaleString()}</span>
                    </h3>
                    <h3>
                      Region: <span>{item.region}</span>
                    </h3>
                    <h3>
                      Capital:{" "}
                      <span>
                        {item.capital ? item.capital.join(", ") : "No capital"}
                      </span>
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No matching countries found.</p>
          )}
        </div>

        {showScrollButton && (
          <button className="scrollToTop" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
