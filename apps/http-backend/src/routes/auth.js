require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = require("../../../db/prisma/prisma");
const { signupSchema, signinSchema } = require("../validators/schema");

const JWT_SECRET = process.env.JWT_SECRET;
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const { success } = signupSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message: "Invalid inputs"
            });
        }

        const { name,email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.json({
            message: "Signup successful"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

authRouter.post("/signin", async (req, res) => {
    try {
        const { success } = signinSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Signin successful",
            token
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = authRouter;