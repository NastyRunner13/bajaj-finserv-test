const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json());

// GET method route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST method route
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  // Response structure
  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    college_email: "john@xyz.com",
    college_roll_number: "ABCD123",
    numbers: [],
    alphabets: [],
    highest_lowercase_alphabet: [],
  };

  if (!Array.isArray(data)) {
    response.is_success = false;
    return res.status(400).json(response);
  }

  // Separate numbers and alphabets
  data.forEach((item) => {
    if (!isNaN(item)) {
      response.numbers.push(item);
    } else if (typeof item === "string" && item.length === 1) {
      response.alphabets.push(item);
    }
  });

  // Determine the highest lowercase alphabet
  const lowercaseAlphabets = response.alphabets.filter(
    (char) => char >= "a" && char <= "z"
  );
  if (lowercaseAlphabets.length > 0) {
    response.highest_lowercase_alphabet = [lowercaseAlphabets.sort().pop()];
  }

  res.status(200).json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
