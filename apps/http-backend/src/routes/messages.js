const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const messageRouter = express.Router();

messageRouter.post("/send",authMiddleware, async(req, res) => {

});


messageRouter.get("/:roomId", async(req, res) => {

});

messageRouter.delete("/:id", async(req, res) => {

});

module.exports = messageRouter;