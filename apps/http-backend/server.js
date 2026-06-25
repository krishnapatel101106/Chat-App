require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;

const RoomRouter = require("./src/routes/rooms");
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const messageRouter = require("./src/routes/messages");

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", RoomRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

app.listen(PORT, ()=> {
    console.log(`Http Backend running on ${PORT}`);
})