import Peer from 'peerjs';
import React, { useEffect, useRef } from 'react';

let peer: Peer;

function Connection() {
  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    peer = new Peer({
      host: location.hostname,
      port: 9000,
      path: '/peerjs',
    });

    peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        // Will print 'hi!'
        console.log(data);
      });
    });
  }, []);

  function myID() {
    console.log(peer.id);
  }

  function connect() {
    let id = inputRef.current?.value!;

    console.log('connect to ', id);

    let conn = peer.connect(id);
    // @ts-ignore
    window.conn = conn;

    conn.on('open', function () {
      // here you have conn.id
      console.log('opeeen');
      conn.send('hi!');
    });
  }

  return (
    <div>
      <button onClick={myID}>my id</button>
      <br />
      <input ref={inputRef} /> <button onClick={connect}>Connect</button>
    </div>
  );
}

export default Connection;
