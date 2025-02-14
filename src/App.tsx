import { Flex } from '@chakra-ui/react';
import TopBar from './components/topBar/TopBar';

function App() {
  return (
    <Flex
      direction='column'
      minH='100dvh'
    >
      <TopBar />
    </Flex>
  );
}

export default App;
