import React, { useEffect, useMemo, useState } from 'react';
import { User } from './RoomState';
import _ from 'lodash';

export function useAudioViz({
  user,
  scale = 4,
}: {
  user: User;
  scale?: number;
}) {
  let [value, setValue] = useState(0);

  useEffect(() => {
    let stream = user.stream;

    if (stream) {
      var ctx = new AudioContext();
      var audioSrc = ctx.createMediaStreamSource(stream);
      var analyser = ctx.createAnalyser();
      // we have to connect the MediaElementSource with the analyser
      audioSrc.connect(analyser);
      // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

      // frequencyBinCount tells you how many values you'll receive from the analyser
      var frequencyData = new Uint8Array(analyser.frequencyBinCount);

      // we're ready to receive some data!
      // loop
      const renderFrame = () => {
        requestAnimationFrame(renderFrame);
        // update data in frequencyData
        analyser.getByteFrequencyData(frequencyData);
        // render frame based on values in frequencyData
        let frequent = Math.max(...frequencyData);
        setValue(frequent);
      };
      renderFrame();
    }
  }, [user.stream]);

  let scaleValue;
  let rangeValue = value - 120; // range value should be from 0 - 135
  if (rangeValue > 0) {
    scaleValue = (rangeValue * scale) / 135;
  }

  return scaleValue;
}

function AudioViz({ user }: { user: User }) {
  let scaleValue = useAudioViz({ user });

  return (
    <div className="relative  flex h-4 w-4 items-center  justify-center">
      <span
        className="absolute block h-1 w-1 rounded-full bg-green-600/20"
        style={{ transform: `scale(${user.audio ? scaleValue : 1})` }}
      ></span>
      <span className="absolute block h-1 w-1 rounded-full bg-green-600"></span>
    </div>
  );
}

export default AudioViz;
