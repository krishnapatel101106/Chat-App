const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { roomSchema } = require("../validators/schema");
const prisma = require("../../../db/prisma/prisma");
const RoomRouter = express.Router();

console.log(__filename);

RoomRouter.post("/create", authMiddleware, async (req, res) => {
    try {
        const { success } = roomSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message: "Room name not provided"
            });
        }

        const { name } = req.body;

        const room = await prisma.room.create({
            data: {
                name: name,
                creatorId: req.userId
            }
        });

        return res.status(201).json({
            message: "Room Created",
            room
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

RoomRouter.post("/join", authMiddleware, async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.userId; 

        if (!roomId) {
            return res.status(400).json({
                message: "Room ID required"
            });
        }

        const room = await prisma.room.findUnique({
            where: { id: roomId }
        });

        if (!room) {
            return res.status(404).json({
                message: "Room does not exist"
            });
        }

        const existing = await prisma.roomMember.findUnique({
            where: {
                userId_roomId: {
                    userId,
                    roomId
                }
            }
        });

        if (existing) {
            return res.status(409).json({
                message: "Already in the room"
            })
        }

        await prisma.roomMember.create({
            data: {
                userId,
                roomId
            }
        })

        return res.json({
            message: "Room Joined",
            roomId
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

RoomRouter.post("/leave", authMiddleware, async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.userId;

        if (!roomId) {
            return res.status(400).json({
                message: "Room ID required"
            });
        }

        const Exists = await prisma.roomMember.findUnique({
            where: {
                userId_roomId: {
                    userId,
                    roomId,
                }
            }
        });

        if (!Exists) {
            return res.status(400).json({
                message: "Not in room"
            });
        }

        await prisma.roomMember.delete({
            where: {
                userId_roomId: {
                    userId,
                    roomId,
                }
            }
        })

        return res.status(200).json({
            message: "Left room successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

RoomRouter.get("/:id", authMiddleware, async (req, res) => {
    try {
        //const id = req.params.id; this will give you "5"
        const roomId = Number(req.params.id);
        const userId = req.userId;

        if (!roomId) {
            return res.status(400).json({
                message: "Invalid room ID"
            });
        }

        const membership = await prisma.roomMember.findUnique({
            where: {
                userId_roomId: {
                    userId,
                    roomId,
                }
            }
        })

        if (!membership) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        })

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            })
        }

        //50 latest msg
        const messages = await prisma.message.findMany({
            where: { roomId },
            orderBy: { createdAt: "desc" },
            take: 50,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        })

        return res.status(200).json({
            room,
            messages: messages.reverse()
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

RoomRouter.get("/user", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        const userRoom = await prisma.roomMember.findMany({
            where: { userId },
            include: {
                room: true
            }
        })

        return res.status(200).json({
            message: "User room fetched",
            rooms: userRoom
        })

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = RoomRouter;