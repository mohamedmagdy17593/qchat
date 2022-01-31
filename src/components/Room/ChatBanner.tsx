import React, { useEffect, useMemo, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { useRoomState, Message } from './RoomState';
import { wrtc } from '../../api/wrtc';
import clsx from 'clsx';
import { useAppState } from '../AppContext/AppContext';
import { format } from 'date-fns';

function ChatBanner() {
  let inputRef = useRef<HTMLInputElement>(null);
  let chatWrapperRef = useRef<HTMLDivElement>(null);
  let roomState = useRoomState();

  function sendMessage() {
    let message = inputRef.current?.value.trim();
    if (message && inputRef.current) {
      wrtc.sendMessage(message);
      inputRef.current.value = '';
    }
  }

  let chatHeightCheckRef = useRef(true);

  useEffect(() => {
    if (chatHeightCheckRef.current) {
      let chatWrapper = chatWrapperRef.current!;
      chatWrapper.scrollTo({
        top: chatWrapper.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [roomState.chat]);

  return (
    <div className="grid max-h-full min-h-full grid-rows-[1fr,auto]">
      <div
        ref={chatWrapperRef}
        className="flex max-h-full flex-col gap-4 overflow-y-auto p-4"
        onScroll={(e) => {
          let chatWrapper = e.target as HTMLDivElement;
          let atTheEnd =
            chatWrapper.offsetHeight + chatWrapper.scrollTop >=
            chatWrapper.scrollHeight - 10;
          chatHeightCheckRef.current = atTheEnd;
        }}
      >
        {roomState.chat.map((message, i) => {
          return <MessageRow key={i} message={message} />;
        })}
      </div>

      <div className="p-4">
        <div className="relative">
          <label htmlFor="message" className="sr-only">
            Send a message to everyone
          </label>
          <input
            ref={inputRef}
            type="text"
            id="message"
            placeholder="Send a message to everyone"
            className="block h-12 w-full rounded-xl border-2 border-neutral-200 pl-4 pr-16 focus:border-green-600 focus:outline-none focus:ring-green-600  sm:text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-green-600 p-2 text-white hover:bg-green-500"
            onClick={() => sendMessage()}
          >
            <MdSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBanner;

interface MessageRowProps {
  message: Message;
}

function MessageRow({ message }: MessageRowProps) {
  let { user: me } = useAppState();
  let roomState = useRoomState();

  let messageUser = useMemo(
    () => roomState.users.find((user) => user.id === message.userId),
    [message.userId, roomState.users],
  );

  let userCharLogo = useMemo(
    () => messageUser?.name.trim()[0]?.toUpperCase(),
    [messageUser?.name],
  );

  let isRight = messageUser?.id === me?.id;

  let time = format(message.timestamp, 'yyyy-MM-dd HH:mm');

  return (
    <div
      className={clsx('flex items-end gap-2', {
        'flex-row-reverse': isRight,
      })}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
        {userCharLogo}
      </div>

      <div className={clsx('flex flex-col', { 'items-end': isRight })}>
        <div
          className={clsx('select-text rounded-lg bg-neutral-200 p-2 text-sm', {
            'rounded-bl-none': !isRight,
            'rounded-br-none': isRight,
          })}
        >
          {message.message}
        </div>
        <div className="mt-2 text-[10px] text-neutral-400">{time}</div>
      </div>

      <div className="w-4 flex-shrink-0"></div>
    </div>
  );
}
