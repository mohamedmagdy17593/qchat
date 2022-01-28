import React from 'react';
import { useRoomState } from './RoomState';
import { useAppState } from '../AppContext/AppContext';

function PeopleBanner() {
  let { user: me } = useAppState();
  let roomState = useRoomState();

  return (
    <div className="">
      <div className="p-4">
        <ul>
          {roomState.users.map((user) => {
            return (
              <li key={user.id} className="py-2">
                {user.name}{' '}
                {user.id === me?.id ? (
                  <span className="ml-2 text-neutral-500">(You)</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PeopleBanner;
