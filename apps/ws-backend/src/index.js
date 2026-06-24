require("dotenv").config();

const prisma = require("../../../db/client");
const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const wss = new WebSocketServer({port: 8080});

const users = [];

console.log("WebSocket server running on port 8080");

wss.on("connection", (socket, request) => {
    try {
        const url = request.url;
        const params = new URLSearchParams(url.split("?")[1]);

        const token = params.get("token");

        if (!token){ 
            socket.close();
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        users.push({
            userId,
            socket,
            rooms: []
        });

        console.log(`User ${userId} connected`);

        socket.on("message", async (data) => {
            try {
                const message = JSON.parse(data.toString());

                const currentUser = users.find(
                    u => u.socket === socket
                );

                if (!currentUser) return;

                //JOIN room
                if (message.type === "join_room"){
                    if (!currentUser.rooms.includes(message.roomId)){
                        currentUser.rooms.push(message.roomId)
                    }

                    socket.send(
                        JSON.stringify({
                            type: "joined",
                            roomId: message.roomId
                        })
                    )
                }
                //LEAVE room
                else if (message.type === "leave_room"){
                    currentUser.rooms = currentUser.rooms.filter(
                        room => room !== message.roomId //remove the current user's roomId
                    );

                    socket.send(
                        JSON.stringify({
                            type:"left",
                            roomId:message.roomId
                        })
                    );
                }
                //CHAT message
                else if (message.type === "chat"){
                    await prisma.message.create({
                        data:{
                            content: message.content,
                            roomId: message.roomId,
                            userId: currentUser.userId
                        }
                    })

                    users.forEach(user => {
                        if (user.rooms.includes(message.roomId)){
                            user.socket.send(
                                JSON.stringify({
                                    type:"chat",
                                    roomId: message.roomId,
                                    content:message.content,
                                    userId: currentUser.userId,
                                    createdAt: new Date()
                                })
                            )
                        }
                    })
                }
            } catch (err){
                console.log("Message error: ", err)
            }
        });

        socket.on("close", ()=> {
            const index = users.findIndex(
                u => u.socket === socket
            );

            if (index !== -1){
                users.splice(index, 1);
            }
            console.log(`User ${userId} disconnected`);
        })

    } catch (err) {
        console.log("Authentication failed");
        socket.close();
    }
});