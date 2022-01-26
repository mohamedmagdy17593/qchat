import { useEffect, useState } from 'react';

export function useCurrentTime() {
  let [time, setTime] = useState(() => currentTime());

  useEffect(() => {
    let id = setInterval(() => {
      setTime(currentTime());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return time;
}

function currentTime() {
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  let p = h <= 12 ? 'AM' : 'PM';
  h = h <= 12 ? h : h - 12;
  return (
    ('0' + h).substr(-2) +
    ':' +
    ('0' + m).substr(-2) +
    // ':' +
    // ('0' + s).substr(-2) +
    ' ' +
    p
  );
}
