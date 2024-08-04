const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
    return res.status(200).json({message: "Admininstrative Portal"});
});

module.exports = adminRouter;