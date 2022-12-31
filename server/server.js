const express = require('express');
const bodyParser = require('body-parser');

const pool = require('./modules/pool.js');

const app = express();

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('server/public'));

// app.get()
app.get('/students', (req, res) => {
  console.log('sending students to client');
  let sqlQuery = `
    SELECT * FROM "students"
      ORDER BY "id";
  `;
  pool.query(sqlQuery)
  .then ((dbRes) => {
    res.send(dbRes.rows)
  }).catch((dbErr) => {
    console.log('something broke in GET /students', dbErr)
    res.sendStatus(500);
  })
})

// app.post()
app.post('/students', (req, res) => {
  let newStudent = req.body
  console.log('adding a student to the database', newStudent);
  let sqlQuery = `
    INSERT INTO "students" ("name")
      VALUES ($1);
  `
  let sqlValues = [newStudent.name];
  pool.query(sqlQuery, sqlValues)
  .then((dbRes) => {
    res.sendStatus(200);
  }).catch((dbErr) => {
    console.log('something broke in POST /students', dbErr);
    res.sendStatus(500);
  })
})

// app.delete()

// app.put()

app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`)
})
