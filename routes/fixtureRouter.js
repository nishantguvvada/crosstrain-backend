const express = require("express");
const { Fixture, User } = require("../db/model");

const fixtureRouter = express.Router();

const shufflePlayers = (arr) => {

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]]= [arr[j], arr[i]];
    };

    return arr;

}

fixtureRouter.get("/", (req, res) => {
    return res.status(200).json({message: "Fixture completed"});
});

fixtureRouter.post("/create", async (req, res) => {

    try {   

        const players = await User.find({});


        if (players.length < 2) {

            return res.status(400).json({ message: "Not enough players to generate fixtures"});

        }

        const shuffledPlayers = shufflePlayers(players);

        let fixture = [];

        for (let i = 0; i < shuffledPlayers.length; i += 2) {

            if ((i + 1) < shuffledPlayers.length) {

                fixture.push(new Fixture({
                    tournament: req.body.tournamentId,
                    player1: shuffledPlayers[i]._id,
                    player2: shuffledPlayers[i + 1]._id,
                    result: 'Pending'
                }));

            } else {

                fixture.push(new Fixture({
                    tournament: req.body.tournamentId,
                    player1: shuffledPlayers[i]._id,
                    player2: null,
                    result: 'bye'
                }));

            }

        }

        const savedFixture = await Fixture.insertMany(fixture);

        res.status(200).json({fixture: savedFixture, message: "Fixture created!"});

    } catch(err) {

        return res.status(400).json({error: "Unable to create the fixture!"});

    }

});

module.exports = fixtureRouter;