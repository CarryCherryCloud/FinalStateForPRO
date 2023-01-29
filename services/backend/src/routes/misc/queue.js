let users_queue = {};
let rooms = {};

// store user in queue waiting for opponent to join the game (if there is no opponent, user is stored in queue)
// if there is opponent, game is created and user is removed from queue
// socket

exports.join_queue = function (socket, io) {
    socket.on('join_queue', function (data) {
        let user_id = data.user_id;
        let user_name = data.user_name;
        let user_socket_id = socket.id;
        let user = {
            user_id: user_id,
            user_name: user_name,
            user_socket_id: user_socket_id
        };
        users_queue[user_id] = user;
        console.log("User " + user_name + " joined queue");
        console.log(users_queue);
        io.emit('queue_update', users_queue);
    });
}

// remove user from queue
// socket

exports.leave_queue = function (socket, io) {
    socket.on('leave_queue', function (data) {
        let user_id = data.user_id;
        let user_name = data.user_name;
        delete users_queue[user_id];
        console.log("User " + user_name + " left queue");
        console.log(users_queue);
        io.emit('queue_update', users_queue);
    });
}

// check if there is opponent for user in queue
// if there is opponent, create room and send room id to both users
// socket

exports.check_queue = function (socket, io) {
    socket.on('check_queue', function (data) {
        let user_id = data.user_id;
        let user_name = data.user_name;
        let user_socket_id = socket.id;
        let user = {
            user_id: user_id,
            user_name: user_name,
            user_socket_id: user_socket_id
        };
        let opponent = null;
        for (let opponent_id in users_queue) {
            if (opponent_id !== user_id) {
                opponent = users_queue[opponent_id];
                break;
            }
        }
        if (opponent !== null) {
            let room_id = uuidv4();
            let room = {
                room_id: room_id,
                user1: user,
                user2: opponent
            };
            rooms[room_id] = room;
            delete users_queue[user_id];
            delete users_queue[opponent.user_id];
            console.log("Room " + room_id + " created");
            console.log(rooms);
            io.emit('queue_update', users_queue);
            io.to(user_socket_id).emit('room_created', room);
            io.to(opponent.user_socket_id).emit('room_created', room);
        }
    });
}
