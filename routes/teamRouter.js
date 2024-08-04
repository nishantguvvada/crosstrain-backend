const express = require("express");

const teamRouter = express.Router();

teamRouter.get("/", (req, res) => {
    return res.status(200).json({message: "Build a team!"});
});

module.exports = teamRouter;