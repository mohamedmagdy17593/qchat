import { User } from '../components/Room/RoomState';
import SimplePeer from 'simple-peer';
import { wss, socket } from './socket';

let peers = new Map<string, SimplePeer.Instance>();

export const wrtc = {
  peerConnection(users: User[]) {
    console.log('this codde should run one time');
    users.forEach((user) => {
      console.log('Inside');

      let peer = new SimplePeer({ initiator: true });
      peers.set(user.id, peer);

      peer.on('signal', (data) => {
        wss.peerConnectWith({ userId: user.id, signal: data });
      });

      // TODO: Remove
      peer.on('connect', () => {
        console.log('HOOOOY');
      });
    });
  },
};

socket.on('peer-connect-signal', ({ userId, signal }) => {
  if (peers.has(userId)) {
    let peer = peers.get(userId)!;
    peer.signal(signal);
  } else {
    let peer = new SimplePeer({});
    peers.set(userId, peer);

    peer.on('signal', (data) => {
      wss.peerConnectWith({ userId: userId, signal: data });
    });

    peer.signal(signal);

    // TODO: Remove
    peer.on('connect', () => {
      console.log('HOOOOY');
    });
  }
});
