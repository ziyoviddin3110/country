import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Country.css";
import { FaHandPointLeft } from "react-icons/fa";

function Country({ appis, isDarkMode }) {
  const { id } = useParams(); 
  const country = appis.find((item) => item.cca3 === id); 

  if (!country) {
    return <p>Loading...</p>;
  }

  return (
    <div className={isDarkMode ? "bg_countrys active" : "bg_countrys"}>
      <div className="container">
        <div className="back">
          <Link to={"/"}>
            <FaHandPointLeft />
            <h3>Back</h3>
          </Link>
        </div>

        <div className="country_block">
          <div className="country_box">
            <img src={country.flags.png} alt={country.name.common} />
          </div>
          <div className="country_box1">
            <div className="names">
              <h2>{country.name.common}</h2>
              <h3>
                Official Name: <span>{country.name.official}</span>
              </h3>
              <h3>
                Population: <span>{country.population.toLocaleString()}</span>
              </h3>
              <h3>
                Region: <span>{country.region}</span>
              </h3>
              <h3>
                Sub Region: <span>{country.subregion || "No data"}</span>
              </h3>
              <h3>
                Capital: <span>{country.capital ? country.capital.join(", ") : "No capital"}</span>
              </h3>
            </div>

            <div className="top">
              <h3>
                Top Level Domain: <span>{country.tld ? country.tld.join(", ") : "No data"}</span>
              </h3>
              <h3>
                Currencies:{" "}
                <span>
                  {country.currencies
                    ? Object.values(country.currencies).map((cur) => cur.name).join(", ")
                    : "No data"}
                </span>
              </h3>
              <h3>
                Languages:{" "}
                <span>
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "No data"}
                </span>
              </h3>
            </div>

            <div className="btn">
              <h3>Border Countries: </h3>
              <div className="btns">
                {country.borders ? (
                  country.borders.map((border, index) => (
                    <button key={index}>{border}</button>
                  ))
                ) : (
                  <span>No bordering countries</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Country;
