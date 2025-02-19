import React from 'react';
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import RequestRow from '../requestRow/RequestRow';
import { useRequestsListController } from './useRequestsListController';
import LoadingModal from '../loadingModal/LoadingModal';
import AnswerRequestFomModal from '../answerRequestFormModal/AnswerRequestFomModal';

const TableHeader: React.FC = () => {
  return (
    <Thead>
      <Tr>
        <Th w='100px'>Pedido</Th>
        <Th flex={1}>Título</Th>
        <Th
          w='80px'
          p={0}
          textAlign='center'
        >
          Timer
        </Th>
      </Tr>
    </Thead>
  );
};

const RequestsList: React.FC = () => {
  const controller = useRequestsListController();

  return (
    <Flex
      flex={1}
      direction='column'
      p={8}
    >
      <Button
        colorScheme='green'
        onClick={() => controller.handleAcceptClick()}
        aria-label={`Aceitar pedido`}
        disabled={!!controller.currentRequest || !controller.requests.length}
        alignSelf='flex-end'
        size='md'
      >
        Aceitar tarefa
      </Button>

      <TableContainer w='100%'>
        <Table
          variant='striped'
          size='lg'
          layout='fixed'
        >
          <TableHeader />

          <Tbody>
            {controller.requests.map((request) => (
              <RequestRow
                key={request.id}
                request={request}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {controller.loading && <LoadingModal />}

      {controller.currentRequest && (
        <AnswerRequestFomModal
          request={controller.currentRequest}
          onRequestEnd={controller.handleCloseRequest}
        />
      )}
    </Flex>
  );
};

export default RequestsList;
