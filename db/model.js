const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

const User = mongoose.model("User", {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    weightClass: {
        type: Number,
        required: false
    },
    level: {
        type: Number,
        required: false
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
});

const Team = mongoose.model("Team", {
    name: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        require: true
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament"
    }
});

const Tournament = mongoose.model("Tournament", {
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Team', 'Player'],
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Fixture = mongoose.model("Fixture", {
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    result: {
        type: String,
        enum: ['Player 1', 'Player 2', 'Draw', 'Pending'],
        required: true
    }
});

module.exports = { User, Team, Tournament, Fixture };