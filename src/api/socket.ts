import { io } from 'socket.io-client';
import { User } from '../components/Room/RoomState';

export const socket = io('/');

socket.on('connect', () => {
  console.log('connected to socket');
  console.log('id: ', socket.id);
});

export const wss = {
  createRoom(data: { name: string }, cb: (roomId: string, user: User) => void) {
    socket.emit('create-new-room', data, cb);
  },

  joinRoom(
    data: { name: string; roomId: string },
    cb: (
      data:
        | { roomId: string; user: User; roomUsers: User[] }
        | { error: string },
    ) => void,
  ) {
    socket.emit('join-room', data, cb);
  },

  onJoiningRoom(roomId: string, cb: (e?: { error: string }) => void) {
    socket.emit('on-joining-room', { roomId }, cb);
  },

  getRoomUsers(cb: (users: User[]) => void) {
    socket.on('room-users', cb);
    return () => {
      socket.off('room-users', cb);
    };
  },

  peerConnectWith({ userId, signal }: { userId: string; signal: any }) {
    socket.emit('peer-connect-with', { userId, signal });
  },
};
