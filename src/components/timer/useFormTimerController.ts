import { useState } from 'react';
import { useTimer } from 'react-timer-hook';

type Props = {
  onExpireCb: () => void;
};

const warningAudio = new Audio('./sounds/time_ending_sound.wav');
const MORE_TIME_REQUESTS_LIMIT = 6;

export const useFormTimerController = ({ onExpireCb }: Props) => {
  const [requestMoreTimeCount, setRequestMoreTimeCount] = useState(0);

  const disableRequestMoreTimeButton =
    requestMoreTimeCount >= MORE_TIME_REQUESTS_LIMIT;

  const timerLimit = new Date();
  timerLimit.setSeconds(timerLimit.getSeconds() + 300); // 1m30s timer

  const { totalSeconds, seconds, minutes, restart, pause } = useTimer({
    expiryTimestamp: timerLimit,
    onExpire: () => {
      if (onExpireCb) {
        onExpireCb();
      }
    },
  });

  const handleMoreTime = () => {
    if (disableRequestMoreTimeButton) return;

    const time = new Date();
    time.setSeconds(time.getSeconds() + totalSeconds + 30);
    restart(time);
    warningAudio.pause();
    warningAudio.currentTime = 0;

    setRequestMoreTimeCount((value) => value + 1);
  };

  if (totalSeconds === 10) {
    warningAudio.play();
  }

  return {
    totalSeconds,
    seconds,
    minutes,
    disableRequestMoreTimeButton,
    handleMoreTime,
    pause,
  };
};
