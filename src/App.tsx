import { Button, HStack, Flex } from '@chakra-ui/react';

function App() {
  return (
    <Flex
      direction='column'
      minH='100dvh'
    >
      <HStack>
        <Button>Click me</Button>
      </HStack>
    </Flex>
  );
}

export default App;
