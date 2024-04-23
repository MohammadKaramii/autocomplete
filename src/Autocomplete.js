import "./Autocomplete.css";

import React, { useState, useEffect } from "react";

const Autocomplete = () => {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [displayedOptions, setDisplayedOptions] = useState(5);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setOptions(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setTitle(event.target.value);
    setOpen(true);
  };

  const filteredOptions = options.filter((option) =>
    option.title
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
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

  const handleShowMore = (increment) => {
    setShowMore(true);
    if (displayedOptions + increment <= options.length) {
      setDisplayedOptions(displayedOptions + increment === 0 ? 5 : displayedOptions + increment);
    } else {
      setDisplayedOptions(options.length);
    }
  };
console.log(displayedOptions);
  return (
    <div className="app">
      <div className="container">
        {open ? (
          <div className="message">
            <h4>
              {searchTerm === "" ? options.length : filteredOptions.length}{" "}
              options are available, search to filter
            </h4>
          </div>
        ) : null}

        <div className="input-container">
          <input
            className="search-input"
            type="text"
            onChange={handleSearch}
            value={title}
          />
          <button
            className="choose-button"
            type="button"
            tabIndex="-1"
            onClick={() => setOpen(!open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 15a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L12 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 12 15z"
                fill="#ef767a"
              />
            </svg>
          </button>
        </div>
        {open ? (
          <ul className="list-options list-scroll">
            {filteredOptions.length === 0 && searchTerm !== "" ? (
              <div className="nothing-found">Nothing found...</div>
            ) : (
              filteredOptions
                .slice(0, displayedOptions)
                .map((option, index) => (
                  <li
                    className={`options  ${
                      option === hoveredOption && option === selectedOption
                        ? "active"
                        : ""
                    }`}
                    tabIndex="-1"
                    key={index}
                    onClick={() => handleClickOption(option)}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <span
                      className={`option ${
                        option === selectedOption ? "selected" : ""
                      } `}
                      value={option.title}
                    >
                      {option.title}
                    </span>
                    {option === selectedOption ? (
                      <span
                        className={`choose-option ${
                          option === hoveredOption ? "active" : ""
                        }`}
                        tabIndex="-1"
                      >
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
        {filteredOptions.length >= 5 && (
          <div
            className={`show-more-wrapper ${open && displayedOptions === 5 ?  "small-list" : open && displayedOptions > 5 ? "large-list" : "" }`}
          >
            <button
              className="show-more-button"
              onClick={() => handleShowMore(5)}
            >
              Show More
            </button>
            <button
              className="show-less-button"
              onClick={() => handleShowMore(-5)}
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
