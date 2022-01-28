import { Server, Socket } from 'socket.io';
import {
  createRoom,
  disconnectUser,
  getClientUsers,
  joinRoom,
  toClientUser,
} from './qchat';

export function apiSocketHandler(io: Server, socket: Socket) {
  socket.on('create-new-room', (data, cb) => {
    let { name } = data;
    let { room, user } = createRoom({ name }, socket);
    cb(room.id, toClientUser(user));
  });

  socket.on('join-room', (data, cb) => {
    let { roomId, name } = data;
    let { room, user } = joinRoom({ roomId, name }, socket);
    io.to(roomId).emit('room-users', getClientUsers(roomId));
    cb(room.id, toClientUser(user));
  });

  socket.on('on-joining-room', (data, cb) => {
    let { roomId } = data;
    socket.emit('room-users', getClientUsers(roomId));
  });

  socket.on('disconnect', () => {
    // @ts-ignore
    let userId = socket.userId;
    if (userId) {
      let res = disconnectUser(userId);
      if (!res) return;
      let { roomId } = res;
      io.to(roomId).emit('room-users', getClientUsers(roomId));
    }
  });
}
