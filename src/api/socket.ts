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
    cb: (roomId: string, user: User) => void,
  ) {
    socket.emit('join-room', data, cb);
  },

  onJoiningRoom(roomId: string) {
    socket.emit('on-joining-room', { roomId });
  },

  getRoomUsers(cb: (users: User[]) => void) {
    socket.on('room-users', cb);
    return () => {
      socket.off('room-users', cb);
    };
  },
};
