const bcrypt = require("bcrypt");
const connection = require("../../database/db");

const fs = require("fs");

const router = require("express").Router();

// CREATE USER FROM REGISTER
router.post("/createUser", async (req, res) => {
  const { pseudo, pswd } = req.body;
  const pswdhash = await bcrypt.hash(pswd, 9);

  const verify = `SELECT pseudo FROM user WHERE pseudo LIKE "${pseudo}"`;

  connection.query(verify, (err, resultat) => {
    if (err) throw err;
    console.log(resultat);
    if (resultat.length == 0) {
      const sql = "INSERT INTO user (pseudo, pswd) VALUES (?, ?)";
      const values = [pseudo, pswdhash];

      connection.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Nouvel utilisateur ajoutée !");
        res.send(JSON.stringify("Nouvel utilisateur ajoutée !"));
      });
    } else {
      console.log("Pseudo déjà utilisé");
      res.send(JSON.stringify("Pseudo déjà utilisé"));
    }
  });
});

module.exports = router;
