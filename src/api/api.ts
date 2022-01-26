import axios from 'axios';

export function checkIfRoomExist(roomID: string) {
  return axios.get(`/api/room/${roomID}`);
}
