const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const db = new sqlite3.Database('./form_submissions.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the form_submissions database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    
    db.run(`INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)`, 
        [name, email, message], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Error submitting form.' });
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.json({ success: true, message: 'Form submitted successfully!' });
    });
});

// Route to get all submissions
app.get('/submissions', (req, res) => {
    db.all(`SELECT * FROM submissions`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Error retrieving submissions.' });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});