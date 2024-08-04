const express = require("express");
const cors = require("cors");
const tournamentRouter = require("./routes/tournamentRouter.js");
const teamRouter = require("./routes/teamRouter.js");
const fixtureRouter = require("./routes/fixtureRouter.js");
const matchRouter = require("./routes/matchRouter.js")
const adminRouter = require("./routes/adminRouter.js");
const userRouter = require("./routes/userRouter.js");

const app = express();

app.use(express.json());
app.use(cors());

// Tournament
app.use("/cfc/v1/tournament", tournamentRouter);
// Team
app.use("/cfc/v1/team", teamRouter);
// Fixture
app.use("/cfc/v1/fixture", fixtureRouter);
// Match
app.use("/cfc/v1/match", matchRouter);
// Admin
app.use("/cfc/v1/admin", adminRouter);
// User
app.use("/cfc/v1/user", userRouter);

app.listen(5000);