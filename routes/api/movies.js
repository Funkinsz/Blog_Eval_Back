const connection = require("../../database/db");

const router = require("express").Router();

router.get("/getMovies", (req, res) => {
  const limit = req.query.limit;
  const user = req.query.user;

  console.log(user);

  let sql;
  let idMoviesSet;
  if (limit) {
    sql = `SELECT * FROM movies ORDER BY created_at ASC LIMIT ${limit}`;
  } else {
    sql = `SELECT COUNT(*) as count FROM movies`;
  }
  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (user) {
      fav = `SELECT * FROM favorite WHERE idUser = ${user} AND isFav = 1`;
      connection.query(fav, (err, resFav) => {
        if (err) throw err;

        for (let index = 0; index < result.length; index++) {
          result[index].isFav = 0;
        }
        const fusion = resFav.concat(result);
        const array = [...new Set(fusion)];

        resFav.idMovies === result.idMovies
          ? (result.liked = true)
          : (result.liked = false);

        idMoviesSet = new Set();
        const updatedArray = array.map((obj) => {
          if (idMoviesSet.has(obj.idMovies)) {
            obj.isFav = 1;
          } else {
            idMoviesSet.add(obj.idMovies);
          }
          return obj;
        });

        console.log(updatedArray);
        res.send(JSON.stringify(updatedArray));
      });
    } else {
      console.log("Liste de films récupérés");
      res.send(JSON.stringify(result));
    }
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
  const idU = req.body.user.idUser;
  const idF = req.body.isLike.idFav;

  const verify = `SELECT isFav FROM favorite WHERE idUser = ${idU} AND idMovies = ${idM}`;

  connection.query(verify, (err, resultVerify) => {
    if (err) throw err;

    console.log(resultVerify.length);
    if (resultVerify.length > 0) {
      console.log("resultat du fav : ");
      console.log(resultVerify[0].isFav);

      const liked = resultVerify[0].isFav === 0 ? 1 : 0;
      const update = `UPDATE favorite SET isFav = ${liked} WHERE idMovies = ${idM} AND idUser = ${idU}`;

      connection.query(update, (err, result) => {
        if (err) throw err;
        console.log("Film toggle en base de données");
        connection.query(
          `SELECT * FROM movies WHERE idMovies = ${idM}`,
          (err, result) => {
            if (err) throw err;

            console.log("test liked");
            console.log(result);
            liked === 0 ? (result[0].liked = false) : (result[0].liked = true);

            console.log(result[0]);
            res.send(JSON.stringify(result[0]));
          }
        );
      });
    } else {
      console.log("insert");
      const fav = `INSERT INTO favorite (idUser, idMovies, isFav) VALUES(${idU}, ${idM}, 1)`;

      connection.query(fav, (err, resultInsert) => {
        if (err) throw err;

        connection.query(
          `SELECT * FROM movies WHERE idMovies = ${idM}`,
          (err, result) => {
            if (err) throw err;

            console.log(result);
            liked === 0 ? (result[0].liked = false) : (result[0].liked = true);
            res.send(JSON.stringify(result[0]));
          }
        );
      });
    }
  });
});

router.get("/getFav", (req, res) => {
  const idM = req.query.idMovie;
  const idU = req.query.user;

  connection.query(
    `SELECT idFav, isFav FROM favorite WHERE idMovies = ${idM} AND idUser = ${idU}`,
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send(JSON.stringify(result[0]));
      }
    }
  );
});

router.get("/myFav", (req, res) => {
  const idU = req.query.idUser;

  console.log(idU);
  connection.query(
    `SELECT DISTINCT * FROM favorite INNER JOIN movies WHERE idUser = ${idU} AND isFav = 1 AND favorite.idMovies = movies.idMovies`,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
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
