const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lesson_article_blog",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("co db");
});

module.exports = connection