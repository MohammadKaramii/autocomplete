import "./App.css";
import ArrowDown from "./assets/arrowdown.jsx"
import  { useState, useEffect } from "react";
import Tick from "./assets/tick.jsx";

const App = () => {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);
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
           <ArrowDown />
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
                       <Tick />
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

export default App;
