import { useRouter } from 'next/router';

export function useRoomId() {
  let router = useRouter();
  console.log('router.query', router);
  let roomId = router.query.roomId as string;
  return roomId;
}
