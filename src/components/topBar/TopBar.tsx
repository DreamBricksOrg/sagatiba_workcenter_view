import React from 'react';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { IoMdExit, IoMdPerson } from 'react-icons/io';
import { useApp } from '@/context/AppContext';

const TopBar: React.FC = () => {
  const { user, logout } = useApp();

  return (
    <HStack
      bgColor='blackAlpha.900'
      w='full'
      p={2}
      pl={8}
      pr={8}
    >
      <IoMdPerson color='#FFFFFF' />
      <Text color='whiteAlpha.900'>{user}</Text>

      <IconButton
        aria-label='logout'
        colorScheme='red'
        icon={<IoMdExit />}
        onClick={logout}
        ml='auto'
      />
    </HStack>
  );
};

export default TopBar;
