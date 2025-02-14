import { Button, VStack, Flex, Text } from '@chakra-ui/react';

function App() {
  return (
    <Flex
      direction='column'
      minH='100dvh'
      justifyContent='center'
      alignItems='center'
    >
      <VStack>
        <Text>Usuário</Text>
        <Button>Click me</Button>
      </VStack>
    </Flex>
  );
}

export default App;
