import React from 'react';
import { Td, Tr } from '@chakra-ui/react';
import StopWatch from '../stopWatch/StopWatch';
import { IRequest } from '@/types/IRequest';

interface RequestRowProps {
  request: IRequest;
}

const formatTitle = (lyrics: string) => {
  const tituloMatch = lyrics.match(/\*\*Título:\s*(.*?)\*\*/);
  return tituloMatch ? tituloMatch[1] : 'Sem título';
};

const RequestRow: React.FC<RequestRowProps> = ({ request }) => {
  return (
    <Tr>
      <Td w='100px'>{request.id.split('-')[0]}</Td>

      <Td
        flex={1}
        isTruncated
      >
        {formatTitle(request.lyrics)}
      </Td>

      <Td
        w='80px'
        p={2}
      >
        <StopWatch />
      </Td>
    </Tr>
  );
};

export default RequestRow;
