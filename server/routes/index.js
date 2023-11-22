const router = require("express").Router();

router.get("/", (req, res) => {
    return res.send("hello")
})

router.use('/users',require('./users'));

module.exports = router;