import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let peers = new Set();
const onlineUsers = new Map();

io.on('connection', (socket) => {

  socket.on('peerId', (peerId) => {
    peers.add(peerId);
    socket.peerId = peerId;
    socket.broadcast.emit('newPeer', peerId);
  });

  socket.on('userOnline', (userId) => {
    const uid = String(userId);
    socket.userId = uid;

    const prev = onlineUsers.get(uid);
    const lastSeen = prev?.lastSeen ?? null;

    onlineUsers.set(uid, { socketId: socket.id, lastSeen, disconnectedAt: null });

    io.emit('onlineStatus', { userId: uid, isOnline: true, lastSeen });

    const allOnline = [];
    onlineUsers.forEach((val, id) => {
      if (val.socketId !== null) {
        allOnline.push({ userId: id, isOnline: true, lastSeen: val.lastSeen });
      }
    });
    socket.emit('onlineList', allOnline);
  });

  socket.on('disconnect', () => {
    if (socket.peerId) {
      peers.delete(socket.peerId);
      socket.broadcast.emit('removePeer', socket.peerId);
    }
    if (socket.userId) {
      const lastSeen = new Date().toISOString();
      onlineUsers.set(socket.userId, { socketId: null, lastSeen, disconnectedAt: lastSeen });
      io.emit('onlineStatus', { userId: socket.userId, isOnline: false, lastSeen });
    }
  });
});

app.get('/', (req, res) => res.send('Socket.IO server is running'));
server.listen(5000, () => console.log('Server: http://localhost:5000'));
