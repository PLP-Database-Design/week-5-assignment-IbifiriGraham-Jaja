require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const mysql = require('mysql2'); // Import MySQL library

const app = express(); // Initialize the Express application

// Database configuration and connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Use environment variables
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// GET endpoint to retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(500).send('Error fetching patients');
    }
    res.json(results);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
