const { Server } = require("socket.io");

const { sessionConfig, corsConfig, wrap } = require("../middlewares/session.middleware");

const { initializeGame } = require('../services/engine.service')

exports.createSocketIOInstance = (webServer) => {
  const io = new Server(webServer, {
    cors: corsConfig,
  });

  io.use(wrap(sessionConfig));

  io.on("connection", (socket) => {
    const session = socket.request.session;
    if (session.socketId === undefined) {
      session.socketId = socket.id;
      session.save();
      // console.log(`${JSON.stringify(session)}`);
    }

    socket.on("game:join", async (data, callback) => {
      const { roomID } = data;
      const connectedSockets = io.sockets.adapter.rooms.get(roomID);
      const socketRooms = Array.from(socket.rooms.values()).filter(
        (r) => r !== socket.id
      );

      if (socketRooms.length > 0) {
        socket.emit("game:error", {
          error: "You already in other room!",
        });
      }
      else if (connectedSockets && connectedSockets.size === 2) {
        socket.emit("game:error", {
          error: "Room is full please choose another room to play!",
        });
      } else {
        await socket.join(roomID);
        socket.emit("game_status:connected");

        if (io.sockets.adapter.rooms.get(roomID).size === 2) {
          console.log("ready to play");
          await initializeGame().then(function (res) {
            console.log(JSON.stringify(res.data));
          }).catch(function (error) {
            console.log(error);
          });;

          // socket.emit("game:start", { start: true, symbol: "x" });
          // socket.to(roomID).emit("game:start", { start: false, symbol: "o" });
        }
      }
    });

    socket.on("game:leave", async (data, callback) => {
      const { roomID } = data;
      try {
        await socket.leave(roomID);
        socket.emit("game_status:leaved");
        socket.to(roomID).emit('user left', socket.id);
      } catch (err) {
        // console.log(err);
        socket.emit("game:error", {
          error: "Couldnt perform requested action!",
        });
      }
    });

    socket.on("game:message-send", async (data, callback) => {
      const { roomID, message } = data;
      // console.log(session.user, session.socketId);
      // console.log(socket.request.session.user);
      socket.to(roomID).emit('game:message-receive', { username: session.user?.username, message: message });
    });
  });

  return io;
};
