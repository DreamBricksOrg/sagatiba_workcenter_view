import React from 'react';
import { Td, Tr, Button } from '@chakra-ui/react';
import StopWatch from '../stopWatch/StopWatch';
import { IRequest } from '@/types/IRequest';

interface RequestRowProps {
  request: IRequest;
  pedido: string;
  titulo: string;
  disableAccept: boolean;
  onAcceptClick: (request: IRequest) => void;
}

const RequestRow: React.FC<RequestRowProps> = ({
  request,
  pedido,
  titulo,
  disableAccept,
  onAcceptClick,
}) => {
  return (
    <Tr>
      <Td w='100px'>{pedido}</Td> {/* Agora exibe o primeiro bloco do UUID */}
      <Td
        flex={1}
        isTruncated
      >
        {titulo} {/* Agora exibe o título extraído da lyrics */}
      </Td>
      <Td
        w='80px'
        p={2}
      >
        <StopWatch />
      </Td>
      <Td w='120px'>
        <Button
          colorScheme='green'
          size='sm'
          onClick={() => onAcceptClick(request)}
          aria-label={`Aceitar pedido ${titulo}`}
          disabled={disableAccept}
        >
          Aceitar
        </Button>
      </Td>
    </Tr>
  );
};

export default RequestRow;
