import { io } from 'socket.io-client';

export const socket = io('/');

socket.on('connect', () => {
  console.log('connected to socket');
  console.log('id: ', socket.id);
});

export const wss = {
  createRoom(data: { name: string }, cb: (id: string) => void) {
    socket.emit('create-new-room', data, cb);
  },
};
