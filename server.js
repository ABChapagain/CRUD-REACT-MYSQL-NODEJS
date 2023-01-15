const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res, next) => {
  const sqlGet = "SELECT * FROM datas";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res, next) => {
  const { firstName, lastName } = req.body;

  const sqlInsert = "INSERT INTO datas (firstName, lastName) VALUES (?, ?)";
  db.query(sqlInsert, [firstName, lastName], (error, result) => {
    if (error) throw error;
    res.send({
      message: "Added Successfully",
      insertedId: result.insertId,
    });
  });
});

app.delete("/api/remove/:id", (req, res, next) => {
  const { id } = req.params;

  const sqlRemove = "DELETE FROM datas WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) throw error;
  });
});

app.get("/api/get/:id", (req, res, next) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM datas WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const sqlUpdate = "UPDATE datas SET firstName = ?, lastName = ? WHERE id = ?";
  db.query(sqlUpdate, [firstName, lastName, id], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
