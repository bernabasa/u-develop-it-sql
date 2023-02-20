const mysql = require('mysql2');

const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();




// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });
// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connectied)
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
})
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to databsae
const db = mysql.createConnection (
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'bernabas.abdeta@yahoo.com',
      // Your MySQL password
      password: 'Workhappy2023$',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

// Default response for any other request (NOT FOUND)
app.use((req, res) => {
    res.status(404).end();
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
