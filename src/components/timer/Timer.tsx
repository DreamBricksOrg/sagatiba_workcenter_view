import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

type TimerProps = {
  totalSeconds: number;
  minutes: number;
  seconds: number;
  handleMoreTime: () => void;
  disableRequestMoreTimeButton: boolean;
};

const Timer: React.FC<TimerProps> = ({
  totalSeconds,
  minutes,
  seconds,
  handleMoreTime,
  disableRequestMoreTimeButton,
}) => {
  const timerColor = totalSeconds > 30 ? 'blue.900' : 'red';
  const text = `${minutes}:${seconds}`;

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
        disabled={disableRequestMoreTimeButton}
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
    </Box>
  );
};

export default Timer;
