import { Flex } from '@chakra-ui/react';
import TopBar from './components/topBar/TopBar';
import RequestsList from './components/requestsList/RequestsList';

function App() {
  return (
    <Flex
      direction='column'
      minH='100dvh'
    >
      <TopBar />

      <RequestsList />
    </Flex>
  );
}

export default App;
