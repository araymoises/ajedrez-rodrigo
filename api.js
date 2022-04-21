var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:postgres@localhost:5432/postgres");

router.post('/login', async function(req, res, next) {
  const prueba = await db.query("SELECT * FROM ajedrez.users");
  console.log('req.query.username', req.body.username);
  db.any("SELECT * FROM ajedrez.users WHERE username = $1", req.body.username)
        .then(function (data) {
            console.log("user:", data);
            res.send(data);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
            res.send(prueba);
            // res.send(error);
        });
});

router.get('/users', async function(req, res, next) {
  console.log(req.query.username);
  res.send(await db.query("SELECT * FROM ajedrez.users"));
});

module.exports = router;
