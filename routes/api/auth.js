const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const connection = require("../../database/db");
const { key, keyPub } = require("../../keys");

const fs = require("fs");

// USER CONNECT + CREATE TOKEN
router.post("/connect", (req, res) => {
  const { pseudo, pswd } = req.body;
  try {
    const sql = `SELECT * FROM user WHERE pseudo = "${pseudo}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const user = result[0];
        if (user) {
          if (bcrypt.compareSync(pswd, user.pswd)) {
            const token = jwt.sign({}, key, {
              subject: user.idUser.toString(),
              expiresIn: 3600 * 24 * 30 * 6,
              algorithm: "RS256",
            });
            res.cookie("blogMoviesToken", token, {
            });
            res.send(user);
          } else {
            res.send(JSON.stringify(null));
          }
        } else {
          res.send(JSON.stringify(null));
        }
      } else {
        res.send(JSON.stringify(null));
      }
    });
  } catch (error) {
    res.send(JSON.stringify(null));
  }
});

router.get("/current", (req, res) => {
  const { blogMoviesToken } = req.cookies;
  console.log({ blogMoviesToken });
  if (blogMoviesToken) {
    try {
      const decodedToken = jwt.verify(blogMoviesToken, keyPub);

      const sql = `SELECT idUser, pseudo FROM user WHERE idUser = ${decodedToken.sub}`;

      connection.query(sql, (err, result) => {
        if (err) throw err;
        const currentUser = result[0];
        if (currentUser) {
          res.send(currentUser);
        } else {
          res.send(JSON.stringify(null));
        }
      });
    } catch (error) {
      res.send(JSON.stringify(null));
    }
  } else {
    res.send(JSON.stringify(null));
  }
});

router.delete("/", (req, res) => {
  res.clearCookie("blogMoviesToken");
  res.send();
});

module.exports = router