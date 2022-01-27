import { Server, Socket } from 'socket.io';

export function apiSocketHandler(io: Server, socket: Socket) {
  socket.on('create-new-room', (data, cb) => {
    let id = 'hola';
    cb(id);
  });

  socket.on('error', (e) => {
    console.log('Errorrrr', e);
  });
}
