import React from 'react';
import { Td, Tr, Button } from '@chakra-ui/react';
import StopWatch from '../stopWatch/StopWatch';
import { IRequest } from '@/types/IRequest';

interface RequestRowProps {
  request: IRequest;
  disableAccept: boolean;
  onAcceptClick: (request: IRequest) => void;
}

const RequestRow: React.FC<RequestRowProps> = ({
  request,
  disableAccept,
  onAcceptClick,
}) => {
  return (
    <Tr>
      <Td w='100px'>{request.id}</Td>
      <Td
        flex={1}
        isTruncated
      >
        {request.title}
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
          aria-label={`Aceitar pedido ${request.title}`}
          disabled={disableAccept}
        >
          Aceitar
        </Button>
      </Td>
    </Tr>
  );
};

export default RequestRow;
