import { Server, Socket } from 'socket.io';
import { User } from '../src/components/Room/RoomState';
import { leaveRoom, rooms, users, usersSetToUsers } from './qchat';
import { createRoom, getClientUsers, joinRoom, toClientUser } from './qchat';

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
    // @ts-ignore
    let socketUserId = socket.userId;
    try {
      let room = rooms.get(roomId);
      if (!room) {
        throw Error(`No room found with this id`);
      }
      if (!room.users.has(socketUserId) && room.users.size >= 4) {
        throw Error(`This room is full try to join again latter`);
      }
      socket.emit('room-users', getClientUsers(roomId));
      cb();
    } catch (e: any) {
      cb({ error: e.message });
    }
  });

  socket.on(
    'peer-connect-with',
    ({ userId, signal }: { userId: string; signal: any }) => {
      try {
        // @ts-ignore
        let socketUserId = socket.userId;
        let user = users.get(userId);
        if (!user) return;
        io.to(user.socketId).emit('peer-connect-signal', {
          userId: socketUserId,
          signal,
        });
      } catch {}
    },
  );

  socket.on('change-user-state', (data: Partial<User>) => {
    try {
      // @ts-ignore
      let socketUserId = socket.userId;
      let user = users.get(socketUserId);
      if (!user) {
        return;
      }

      // update user state
      Object.assign(user, data);

      let roomId = user.roomId;
      io.to(roomId).emit('room-users', getClientUsers(roomId));
    } catch {}
  });

  socket.on('leave-room', () => {
    leaveRoom(socket, io);
  });

  socket.on('disconnect', () => {
    leaveRoom(socket, io);
  });
}
