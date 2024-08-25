import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResponse(null);

    try {
      // Validate JSON
      const data = JSON.parse(jsonInput);

      // Call the REST API
      const result = await axios.post("http://localhost:5000/bfhl", data);
      setResponse(result.data);
    } catch (err) {
      setError("Invalid JSON input or API error");
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(value)
        ? prevOptions.filter((option) => option !== value)
        : [...prevOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    const filteredData = {
      numbers: selectedOptions.includes("Numbers") ? numbers : [],
      alphabets: selectedOptions.includes("Alphabets") ? alphabets : [],
      highest_lowercase_alphabet: selectedOptions.includes(
        "Highest lowercase alphabet"
      )
        ? highest_lowercase_alphabet
        : [],
    };

    return (
      <div>
        <h2>Response Data:</h2>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number: ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON here..."
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h2>Select options to display:</h2>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            checked={selectedOptions.includes("Alphabets")}
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            checked={selectedOptions.includes("Numbers")}
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest lowercase alphabet"
            checked={selectedOptions.includes("Highest lowercase alphabet")}
            onChange={handleOptionChange}
          />
          Highest lowercase alphabet
        </label>
      </div>

      {renderResponse()}
    </div>
  );
}

export default App;
