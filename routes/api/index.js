const router = require("express").Router()

const apiUser = require("./user")
const apiAuth = require("./auth")
const apiMovies = require("./movies")

router.use("/user", apiUser)
router.use("/auth", apiAuth)
router.use("/movies", apiMovies)

module.exports = router