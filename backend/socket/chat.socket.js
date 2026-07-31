export default function chatSocket(io, socket) {
  // Join a project room
  socket.on("join-project", (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project room: ${projectId}`);

    // Notify room of updated user count
    const room = io.sockets.adapter.rooms.get(projectId);
    const count = room ? room.size : 0;
    io.to(projectId).emit("room-users", count);
  });

  // Leave a project room
  socket.on("leave-project", (projectId) => {
    socket.leave(projectId);
    console.log(`Socket ${socket.id} left project room: ${projectId}`);

    const room = io.sockets.adapter.rooms.get(projectId);
    const count = room ? room.size : 0;
    io.to(projectId).emit("room-users", count);
  });

  // Get current room user count
  socket.on("get-room-users", (projectId) => {
    const room = io.sockets.adapter.rooms.get(projectId);
    const count = room ? room.size : 0;
    socket.emit("room-users", count);
  });

  // Handle incoming chat messages
  socket.on("send-message", ({ projectId, text ,senderName}) => {
    if (!projectId || !text?.trim()) return;

    const message = {
      text: text.trim(),
      senderName: senderName,
      senderId: socket.id,
      time: new Date().toISOString(),
      isSelf: false,
    };

    // Broadcast the message to everyone in the room (including sender for consistency)
    io.to(projectId).emit("chat-message", message);
    console.log(`Message from ${message.senderName} in ${projectId}: ${text.slice(0, 60)}`);
  });

  // Handle disconnection — update room counts
  socket.on("disconnect", () => {
    // Check all rooms the socket was in and update counts
    for (const [roomId, room] of io.sockets.adapter.rooms) {
      if (room.size > 0) {
        io.to(roomId).emit("room-users", room.size);
      }
    }
    });
}