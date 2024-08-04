const express = require("express");
const { Tournament } = require("../db/model");

const tournamentRouter = express.Router();

tournamentRouter.get("/", (req, res) => {
    return res.status(200).json({message: "Enter the tournament"})
});

tournamentRouter.post("/create", async (req, res) => {

    try {

        const existingTournament = await Tournament.findOne({name: req.body.name});

        if (existingTournament) {
            return res.status(400).json({error: "Tournament already exists!"});
        }

        const tournament = new Tournament({
            name: req.body.name,
            type: req.body.type,
            location: "Crosstrain Fight Club"
        });

        await tournament.save();

        // generate token if required

        return res.status(200).json({message: "Tournament created!", tournament: tournament._id});

    } catch(err) {

        return res.status(400).json({error: err});

    }

});

module.exports = tournamentRouter;