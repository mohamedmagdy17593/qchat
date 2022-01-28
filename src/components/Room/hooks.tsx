import { useRouter } from 'next/router';

export function useRoomId() {
  let router = useRouter();
  let roomId = router.query.roomId as string;
  return roomId;
}
