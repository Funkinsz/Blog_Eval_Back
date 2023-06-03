const connection = require("../../database/db");

const router = require("express").Router();

router.get("/getMovies", (req, res) => {
  const limit = req.query.limit;
  let sql;
  if (limit) {
    sql = `SELECT * FROM movies ORDER BY created_at ASC LIMIT ${limit}`;
  } else {
    sql = `SELECT COUNT(*) as count FROM movies`;
  }
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Liste de films récupérés");
    res.send(JSON.stringify(result));
  });
});

router.get("/getOneMovie", (req, res) => {
  console.log(req.params);
});

router.post("/deleteMovie", (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  let sqlDelete = `DELETE FROM movies WHERE idMovies=${id}`;

  connection.query(sqlDelete, (err, result) => {
    if (err) throw err;
    console.log("Film supprimé");
    res.send(JSON.stringify("Film supprimé"));
  });
});

router.post("/toggleLiked", (req, res) => {
  const idM = req.body.idMovies;
  const idU = req.body.idUser;

  const verify = `SELECT * FROM favorite WHERE idUser = ${idU} AND idMovies = ${idM}`;

  connection.query(verify, (err, resultVerify) => {
    if (err) throw err;
    if (resultVerify.length > 0) {
      const liked = resultVerify === true ? "1" : "0";
      const update = `UPDATE favorite SET isFav = "${liked}" WHERE idMovies = ${idM} AND idUser = ${idU}`;

      connection.query(update, (err, result) => {
        if (err) throw err;
        console.log("Film toggle en base de données");
        connection.query(
          `SELECT * FROM favorite WHERE idMovies=${idM} AND idUser = ${idU}`,
          (err, result) => {
            if (err) throw err;
            console.log(result);
            result[0].liked == 0
              ? (result[0].liked = false)
              : (result[0].liked = true);
            res.send(JSON.stringify(result[0]));
          }
        );
      });
    } else {
      const fav = `INSERT INTO favorite (idUser, idMovies, isFav) VALUES(${idU}, ${idM}, 1)`;

      connection.query(fav, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result[0]));
      });
    }
  });
});

router.post("/addMovie", (req, res) => {
  const nameMovies = req.body.title;
  const poster = req.body.image;
  const dateOfRelease = req.body.date;
  const duration = req.body.duration;
  const resume = req.body.resume;

  const sql = `INSERT INTO movies (nameMovies, dateOfRelease, resume, poster, duration) VALUES ( ?, ?, ?, ? ,?)`;
  const values = [nameMovies, dateOfRelease, resume, poster, duration];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Film ajouté à la base de données");
    res.send(JSON.stringify("Film ajouté à la base de données"));
  });
});

module.exports = router;
