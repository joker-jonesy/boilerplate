const express = require('express');
const router = express.Router();

router.get("/v1", (req, res, next) => {
    if(!req.user){
        res.status(401).send("nothing found")
    }

    try {
        res.json({
            project: "React and Express Boilerplate",
            from: "Vanaldito",
        });
    } catch(err){
        next(err)
    }


});

module.exports = router;