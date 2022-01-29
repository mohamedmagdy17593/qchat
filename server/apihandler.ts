import { Server, Socket } from 'socket.io';
import { leaveRoom, users, usersSetToUsers } from './qchat';
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
    try {
      let { roomId, name } = data;
      let { room, user } = joinRoom({ roomId, name }, socket);
      let roomUsers = usersSetToUsers(room.users)
        .filter((u) => u.id !== user.id)
        .map(toClientUser);
      io.to(roomId).emit('room-users', getClientUsers(roomId));
      cb({ roomId: room.id, user: toClientUser(user), roomUsers });
    } catch (e: any) {
      cb({ error: e.message });
    }
  });

  socket.on('on-joining-room', (data, cb) => {
    let { roomId } = data;
    try {
      socket.emit('room-users', getClientUsers(roomId));
      cb();
    } catch (e: any) {
      cb({ error: e.message });
    }
  });

  socket.on(
    'peer-connect-with',
    ({ userId, signal }: { userId: string; signal: any }) => {
      // @ts-ignore
      let socketUserId = socket.userId;
      let user = users.get(userId);
      console.log('user', user);
      if (!user) return;
      io.to(user.socketId).emit('peer-connect-signal', {
        userId: socketUserId,
        signal,
      });
    },
  );

  socket.on('leave-room', () => {
    leaveRoom(socket, io);
  });

  socket.on('disconnect', () => {
    leaveRoom(socket, io);
  });
}
