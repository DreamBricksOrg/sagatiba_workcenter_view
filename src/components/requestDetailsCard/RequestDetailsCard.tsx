import React from 'react';
import {
  Heading,
  Card,
  CardHeader,
  HStack,
  IconButton,
  CardBody,
  Box,
  Text,
  useToast,
} from '@chakra-ui/react';
import { IoMdCopy } from 'react-icons/io';
import { IRequest } from '@/types/IRequest';

type Props = {
  request: IRequest;
};

const RequestDetailsCard: React.FC<Props> = ({ request }) => {
  const toast = useToast();

  const copyToClipboard = async () => {
    let toastTitle = 'Letra copiada';
    let toastStatus: 'error' | 'success' = 'success';

    try {
      await navigator.clipboard.writeText(request.lyrics);
    } catch {
      toastStatus = 'error';
      toastTitle = 'Falha ao copiar letra';
    } finally {
      toast({
        title: toastTitle,
        status: toastStatus,
        variant: 'subtle',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Heading
        size='md'
        noOfLines={1}
        textAlign='center'
      >
        {request.title}
      </Heading>

      <Card
        mt={4}
        mb={8}
        bgColor='gray.100'
        maxH='sm'
      >
        <CardHeader pb={0}>
          <HStack>
            <Heading
              size='md'
              noOfLines={2}
              textAlign='center'
              flex={1}
            >
              Letra:
            </Heading>

            <IconButton
              aria-label='Copiar letra'
              icon={<IoMdCopy />}
              colorScheme='blue'
              onClick={copyToClipboard}
            />
          </HStack>
        </CardHeader>

        <CardBody
          overflowY='auto'
          mt={2}
        >
          <Box borderRadius={4}>
            <Text
              as='pre'
              whiteSpace='pre-wrap'
              textAlign='center'
            >
              {request.lyrics}
            </Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default RequestDetailsCard;
