import { nanoid } from 'nanoid';
import { getRoomID } from './helpers';
import { Socket } from 'socket.io';

interface User {
  name: string;
  id: string;
  socketId: string;
  roomId: string;
}

interface Room {
  id: string;
  users: Set<string>;
}

export let users = new Map<string, User>();
export let rooms = new Map<string, Room>();

export function createRoom(
  hostUser: {
    name: string;
  },
  socket: Socket,
) {
  let roomId = getRoomID();

  let user: User = {
    id: nanoid(),
    name: hostUser.name,
    roomId,
    socketId: socket.id,
  };

  let room: Room = {
    id: roomId,
    users: new Set([user.id]),
  };

  users.set(user.id, user);
  rooms.set(room.id, room);
  // @ts-ignore
  socket.userId = user.id;
  socket.join(roomId);

  return { room, user };
}

export function joinRoom(
  { name, roomId }: { name: string; roomId: string },
  socket: Socket,
) {
  let room = rooms.get(roomId);
  if (!room) {
    throw Error(`No room found with this id`);
  }

  let user: User = {
    id: nanoid(),
    name,
    roomId,
    socketId: socket.id,
  };

  room.users.add(user.id);
  users.set(user.id, user);
  // @ts-ignore
  socket.userId = user.id;
  socket.join(roomId);

  return { room, user };
}

export function disconnectUser(userId: string) {
  let user = users.get(userId);
  if (!user) {
    return;
  }
  users.delete(userId);

  let room = rooms.get(user.roomId);
  if (!room) {
    return;
  }
  room.users.delete(user.id);

  if (room.users.size === 0) {
    // delete the room there is no users
    rooms.delete(room.id);
  }

  return { roomId: room.id };
}

// chat room helpers

export function getRomeUsers(roomId: string) {
  let room = rooms.get(roomId);
  if (!room) {
    throw Error(`No room found with this id`);
  }
  let roomUsers = usersSetToUsers(room.users);
  return roomUsers;
}

export function usersSetToUsers(usersSet: Set<string>) {
  return [...usersSet].map((userId) => users.get(userId)!);
}

export function toClientUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    roomId: user.roomId,
  };
}

export function getClientUsers(roomId: string) {
  let roomUsers = getRomeUsers(roomId);
  let clientRoomUsers = roomUsers.map(toClientUser);
  return clientRoomUsers;
}
