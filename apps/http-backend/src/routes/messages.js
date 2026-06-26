const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const prisma = require("../../../db");
const { messageSchema } = require("../validators/schema");
const messageRouter = express.Router();

messageRouter.post("/send",authMiddleware, async(req, res) => {
    try {
       const parsedData = messageSchema.safeParse(req.body);

       if (!parsedData.success){
        return res.status(400).json({
            message:"Invalid inputs"
        });
       }

       const { content, roomId } = parsedData.data;

       const message = await prisma.message.create({
        data:{
            content,
            roomId,
            userId: req.userId
        }
       })
        
            return res.json({
                message: "Message sent",
                data: message
            });

        } catch (err) {
            console.log(err);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);


messageRouter.get("/:roomId", async(req, res) => {
    try {
        const roomId = Number(req.params.roomId);

        const messages = await prisma.message.findMany({
            where:{
                roomId
            },
            include:{
                user:{
                    select:{
                        id:true,
                        username: true
                    }
                }
            },
            orderBy:{
                createdAt:"asc"
            }
        })

        return res.json(messages);

     } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

messageRouter.delete("/:id", async(req, res) => {
    try {
        const id = Number(req.params.id);

        const message = await prisma.message.findUnique({
            where:{ id }
        });

        if (!message){
            return res.status(404).json({
                    message: "Message not found"
                });
        }

        if (message.userId !== req.userId){
            return res.status(403).json({
                message:"Unauthorized"
            });
        }

        await prisma.message.delete({
            where:{ id }
        })

        return res.json({
            message:"Deleted successfully"
        })

     } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = messageRouter;