import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.json({ message: "funcionou" });
});

let users: string[] = [];

io.on("connection", (socket) => {
    users.push(socket.id);
    console.log(users.length);

    socket.on("username", (msg) => {
        io.emit("welcome", `${msg.name} está logado!`);
    })

    socket.on("textSend", (msg) => {
        console.log(msg)
        io.emit("chat-message", msg)
    })

    socket.on("disconnect", (msg) => {
        users = users.filter(userId => userId !== socket.id)
        console.log("Usuário desconectado, numero de ativos: ", users.length);
    });
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});