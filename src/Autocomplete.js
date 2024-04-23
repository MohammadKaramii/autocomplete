import "./Autocomplete.css";

import React, { useState, useEffect } from "react";

const Autocomplete = () => {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);
  
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setOptions(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setTitle(event.target.value);
    setOpen(true)
  };

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase()
                .replace(/\s+/g, '')
                .includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
  );

  useEffect(() => {
    if (filteredOptions.length === 1) {
      setSelectedOption(filteredOptions[0]);
    }
  }, [filteredOptions, selectedOption]);

  const handleClickOption = (option) => {
    setOpen(false);
    setSearchTerm("");
    setSelectedOption(option);
    setTitle(option.title);
  };


  return (
    <div className="app">
      <div className="aaaa">
        <div className="a">
          <div className="custom-class">
            <input
              className="searchInput"
              type="text"
              onChange={handleSearch}
              value={title}
            />
            <button
              className="chooseButton"
              type="button"
              tabIndex="-1"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {open ? (
  <ul className="listOptions listScroll">
    {filteredOptions.length === 0 && searchTerm !== "" ? (
      <div className="nothingFound" role="none">
        Nothing found...
      </div>
    ) : (
      filteredOptions.map((option, index) => (
        <li
        className={`options  ${option === hoveredOption && option === selectedOption ? "active" : ""}`}
          tabIndex="-1"
          key={index}
          onClick={() => handleClickOption(option)}
          onMouseEnter={() => setHoveredOption(option)}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <span className={`option ${option === selectedOption ? "selected" : ""} `} value={option.title}>
            {option.title}
          </span>
          {option === selectedOption ? (
            <span className={`chooseOption ${option === hoveredOption  ? "active" : ""}`}
            tabIndex="-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          ) : null}
        </li>
      ))
    )}
  </ul>
) : null}
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;

