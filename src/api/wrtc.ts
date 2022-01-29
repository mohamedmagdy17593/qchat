import { globalRoomContextValue, User } from '../components/Room/RoomState';
import SimplePeer from 'simple-peer';
import { wss, socket } from './socket';

let peers = new Map<string, SimplePeer.Instance>();
let stream: MediaStream | null = null;

export const wrtc = {
  peerConnection(users: User[]) {
    users.forEach((user) => {
      let peer = new SimplePeer({ initiator: true });
      setUpPeerEvents(peer, { userId: user.id });
    });
  },

  setStream(_stream: MediaStream) {
    stream = _stream;
    peers.forEach((peer) => {
      if (stream) {
        peer.addStream(stream);
      }
    });
  },
};

socket.on('peer-connect-signal', ({ userId, signal }) => {
  if (peers.has(userId)) {
    let peer = peers.get(userId)!;
    peer.signal(signal);
  } else {
    let peer = new SimplePeer({});
    setUpPeerEvents(peer, { userId });
    peer.signal(signal);
  }
});

function setUpPeerEvents(
  peer: SimplePeer.Instance,
  { userId }: { userId: string },
) {
  if (stream) {
    peer.addStream(stream);
  }

  peers.set(userId, peer);

  peer.on('signal', (data) => {
    wss.peerConnectWith({ userId: userId, signal: data });
  });

  peer.on('stream', (stream) => {
    globalRoomContextValue.dispatch({
      type: 'SET_STREAM_FOR_USER',
      payload: { userId: userId, stream },
    });
  });

  peer.on('error', (err) => {
    console.log('peer -- error', err);
  });

  peer.on('close', () => {
    console.log('peer -- close', userId);
    peer.destroy();
    peers.delete(userId);
  });
}
