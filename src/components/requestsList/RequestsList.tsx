import React from 'react';
import {
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
        <Th w='120px'>Aceitar</Th>
      </Tr>
    </Thead>
  );
};

const RequestsList: React.FC = () => {
  const controller = useRequestsListController();

  return (
    <Flex
      flex={1}
      justifyContent='center'
      p={8}
    >
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
                onAcceptClick={controller.handleAcceptClick}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default RequestsList;
