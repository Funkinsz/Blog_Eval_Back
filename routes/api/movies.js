const connection = require("../../database/db");

const router = require("express").Router();

router.get("/getMovies", (req, res) => {
  const limit = req.query.limit;
  const user = req.query.user;

  let sql;
  let idMoviesSet;
  if (limit) {
    sql = `SELECT * FROM movies ORDER BY created_at ASC LIMIT ${limit}`;
  } else {
    sql = `SELECT COUNT(*) as count FROM movies`;
  }
  connection.query(sql, (err, result) => {
    if (err) throw err;

    // si un utilisateur est connectée, on génère les likes depuis la table favorite + movies
    if (user) {
      // d'abord on selectionne les films liké dans la table favorite en lien avec l'idUser
      fav = `SELECT * FROM favorite WHERE idUser = ${user} AND isFav = 1`;
      connection.query(fav, (err, resFav) => {
        if (err) throw err;

        // la boucle for ajoute l'object isFav = 0 pour préparer le tableau Movies et le fusion avec le tableau Favorite
        for (let index = 0; index < result.length; index++) {
          result[index].isFav = 0;
        }

        // on mélange les 2 tableaux
        const fusion = resFav.concat(result);

        // on supprime les doublons
        const array = [...new Set(fusion)];

        // on crée un nouveau tableau qui se base sur l'idMovies (present dans movies et favorite)
        idMoviesSet = new Set();
        // on map sur ce tableau pour recuperer l'idMovies
        const updatedArray = array.map((obj) => {
          // .has permet de vérifier si l'idMovies à déjà été appelé
          if (idMoviesSet.has(obj.idMovies)) {
            // convertit les "isFav: 0" du tableau Mvoies en "isFav: 1" s'ils sont liké dans le tableau favorite
            obj.isFav = 1;
          } else {
            // si le film n'est pas présent dans la table Favorite, il sera ajouté dans le nouveau tableau
            idMoviesSet.add(obj.idMovies);
          }
          return obj;
        });

        // la dernière étape consiste a gardé les objects qui ont nameMovies, cela supprime les doublons.
        // on aurai pu le faire également avec poster, resume, duration...
        const filterArray = updatedArray.filter((object) =>
          object.hasOwnProperty("nameMovies")
        );
        res.send(JSON.stringify(filterArray));
      });

      // si l'utilisateur n'est pas connectée, on génère les films sans filtre like
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

  console.log(idM);

  //  on verifie si la table Favorite retourne des valeurs avec l'idUser 
  const verify = `SELECT isFav FROM favorite WHERE idUser = ${idU} AND idMovies = ${idM}`;

  connection.query(verify, (err, resultVerify) => {
    if (err) throw err;

    // si le resultat est suppérieur a 1, alors on envoie un update
    if (resultVerify.length > 0) {
      const liked = resultVerify[0].isFav === 0 ? 1 : 0;
      const update = `UPDATE favorite SET isFav = ${liked} WHERE idMovies = ${idM} AND idUser = ${idU}`;

      connection.query(update, (err, result) => {
        if (err) throw err;
        console.log("Film toggle en base de données");
        connection.query(
          `SELECT * FROM movies WHERE idMovies = ${idM}`,
          (err, result) => {
            if (err) throw err;

            // génère un true ou false (le contrere de ce qui visible en BDD)
            liked === 0 ? (result[0].liked = false) : (result[0].liked = true);
            res.send(JSON.stringify(result[0]));
          }
        );
      });

      // si le resultat est égale a 0, alors on envoie un insert
    } else {
      const fav = `INSERT INTO favorite (idUser, idMovies, isFav) VALUES(${idU}, ${idM}, 1)`;

      console.log("insert");
      connection.query(fav, (err, resultInsert) => {
        if (err) throw err;

        connection.query(
          `SELECT * FROM movies WHERE idMovies = ${idM}`,
          (err, result) => {
            if (err) throw err;

            const liked = (result[0].isFav = 1);

            res.send(JSON.stringify(liked));
          }
        );
      });
    }
  });
});

router.get("/myFav", (req, res) => {
  const idU = req.query.idUser;

  connection.query(
    `SELECT DISTINCT * FROM favorite INNER JOIN movies WHERE idUser = ${idU} AND isFav = 1 AND favorite.idMovies = movies.idMovies`,
    (err, result) => {
      if (err) throw err;
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
