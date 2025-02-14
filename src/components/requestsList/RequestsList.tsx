import React, { useState } from 'react';
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { requestsListMock } from '@/mocks/requestListMock';
import { IRequest } from '@/types/IRequest';

const RequestsList: React.FC = () => {
  const toast = useToast();
  const [requests, setRequests] = useState<IRequest[]>(requestsListMock);

  const copyToClipboard = async (request: IRequest) => {
    try {
      await navigator.clipboard.writeText(request.lyrics);
      toast({
        title: 'Pedido aceito',
        description: 'A letra foi copiada para área de transferência',
        variant: 'subtle',
        status: 'success',
        position: 'top-right',
      });
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível copiar a letra',
        variant: 'subtle',
        status: 'error',
        position: 'top-right',
      });
    }
  };

  const handleAcceptClick = async (request: IRequest) => {
    // TODO - Implementar request

    copyToClipboard(request);
  };

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
          <Thead>
            <Tr>
              <Th
                w='100px'
                p={2}
              >
                Pedido
              </Th>
              <Th
                flex={1}
                p={2}
              >
                Título
              </Th>
              <Th
                w='80px'
                p={2}
              >
                Timer
              </Th>
              <Th
                w='100px'
                p={2}
              >
                Aceitar
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {requests.map((request) => (
              <Tr key={request.id}>
                <Td
                  p={2}
                  w='100px'
                >
                  {request.id}
                </Td>
                <Td
                  flex={1}
                  isTruncated
                  p={2}
                >
                  {request.title}
                </Td>
                <Td
                  w='80px'
                  p={2}
                >
                  1:00
                </Td>
                <Td
                  w='100px'
                  p={2}
                >
                  <Button
                    colorScheme='green'
                    size='sm'
                    onClick={() => handleAcceptClick(request)}
                    aria-label={`Aceitar pedido ${request.title}`}
                  >
                    Aceitar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default RequestsList;
