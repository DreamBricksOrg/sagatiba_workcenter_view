import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useTimer } from 'react-timer-hook';

type Prop = {
  expiryTimestamp?: Date;
  onExpireCb?: () => void;
};

const warningAudio = new Audio('./sounds/time_ending_sound.wav');

const Timer: React.FC<Prop> = ({ expiryTimestamp, onExpireCb }) => {
  if (!expiryTimestamp) {
    const timerLimit = new Date();
    timerLimit.setSeconds(timerLimit.getSeconds() + 90); // 1m30s timer
    expiryTimestamp = timerLimit;
  }

  const { totalSeconds, seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      if (onExpireCb) {
        onExpireCb();
      }
    },
  });

  const handleMoreTime = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + totalSeconds + 30);
    restart(time);
    warningAudio.pause();
    warningAudio.currentTime = 0;
  };

  const timerColor = totalSeconds > 30 ? 'blue.900' : 'red';
  const text = `${minutes}:${seconds}`;

  if (totalSeconds === 10) {
    warningAudio.play();
  }

  return (
    <Box
      display='flex'
      flexDir='row'
      color='white'
      p={2}
      borderRadius={4}
      alignItems='center'
    >
      <Button
        size='md'
        mr={4}
        colorScheme='yellow'
        onClick={handleMoreTime}
      >
        Mais tempo
      </Button>

      <Text
        fontWeight='bold'
        color={timerColor}
        fontSize={['lg', 'xl', '3xl']}
      >
        Tempo restante:
      </Text>

      <Text
        ml={2}
        fontWeight='bold'
        fontSize={['lg', 'xl', '3xl']}
        color={timerColor}
      >
        {text}
      </Text>

      {/* <button onClick={handleMoreTime}>+tempo</button> */}
    </Box>
  );
};

export default Timer;
