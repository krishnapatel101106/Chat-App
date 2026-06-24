const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const prisma = require("../../../db/client");
const userRouter = express.Router();

userRouter.get("/me",authMiddleware, async(req, res) => {
    try {
        const userId = req.body.userId;

        const findUser = await prisma.user.findUnique({
            where : {id: userId}
        });

        if (!findUser){
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.json({
            user: findUser
        })

    } catch (err){
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = userRouter;