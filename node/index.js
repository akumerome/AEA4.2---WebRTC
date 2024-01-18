const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"]
    }
  });

let arraySockets = [];
let arrayConnexions = [];
let sala = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    const data_socket = {id: socket.id, socket: socket};
    arraySockets.push(data_socket);

    socket.on('enviar-nom', (nom) => {
        const connexio = {id: socket.id, nom: nom};
        arrayConnexions.push(connexio);
        io.emit('nom-enviat', arrayConnexions);
        socket.emit('anar-connexions');
    });

    socket.on('anar-sala', (idAltre) => {
        let socket_index = arraySockets.findIndex(socket => socket.id == idAltre);
        let socketAltre = arraySockets[socket_index].socket;
        socketAltre.join('room-1');
        socket.join("room-1");
        io.to("room-1").emit('anar-sala');
    })

    socket.on('disconnect', () => {
        let posicio;

        for (let i = 0; i < arrayConnexions.length; i++) {
            if (arrayConnexions[i].id == socket.id) {
                posicio = i;
            }
        }
        arrayConnexions.splice(posicio, 1);
        io.emit('nom-enviat', arrayConnexions);
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});