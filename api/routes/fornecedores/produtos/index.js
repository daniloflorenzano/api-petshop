const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send(
        JSON.stringify([])
    )
})

module.exports = router;