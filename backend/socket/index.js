import chatSocket from "./chat.socket.js";

export default function registerSocketHandlers(io) {
    io.on("connection",(socket) => {
        console.log("A user connected:", socket.id)

        chatSocket(io, socket) // Pass both io and socket to chatSocket

        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id)
        });
    });
}