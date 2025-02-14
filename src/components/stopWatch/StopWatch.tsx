import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useStopwatch } from 'react-timer-hook';

const StopWatch: React.FC = () => {
  const { totalSeconds, seconds, minutes } = useStopwatch({
    autoStart: true,
  });

  const text = `${minutes}:${seconds}`;
  const bg = totalSeconds < 30 ? 'blue.500' : 'red';

  return (
    <Box
      bg={bg}
      color='white'
      p='4px'
      textAlign='center'
      borderRadius={4}
    >
      <Text>{text}</Text>
    </Box>
  );
};

export default StopWatch;
