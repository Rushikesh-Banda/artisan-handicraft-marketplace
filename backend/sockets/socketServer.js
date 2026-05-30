const { Server } = require("socket.io");


// Initialize Socket Server
const initSocketServer = (server) => {

  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });


  io.on("connection", (socket) => {

    console.log(
      `Socket Connected: ${socket.id}`
    );


    // Join User Room
    socket.on("join", (userId) => {

      socket.join(userId);

      console.log(
        `User joined room: ${userId}`
      );
    });


    // Real-Time Notifications
    socket.on(
      "sendNotification",
      (data) => {

        io.to(data.userId).emit(
          "receiveNotification",
          {
            title: data.title,
            message: data.message,
            type: data.type,
            link: data.link,
          }
        );
      }
    );


    // Disconnect Event
    socket.on("disconnect", () => {

      console.log(
        `Socket Disconnected: ${socket.id}`
      );
    });
  });


  return io;
};


module.exports = initSocketServer;