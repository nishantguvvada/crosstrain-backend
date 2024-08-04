const express = require("express");

const matchRouter = express.Router();

matchRouter.get("/", (req, res) => {
    return res.status(200).json({message: "Ready for a match"});
});

module.exports = matchRouter;