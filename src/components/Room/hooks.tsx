import { useRouter } from 'next/router';

export function useRoomId() {
  let router = useRouter();
  console.log('router.query', router);
  let roomId = (router.query.roomId || router.query.roomID) as string;
  return roomId;
}
