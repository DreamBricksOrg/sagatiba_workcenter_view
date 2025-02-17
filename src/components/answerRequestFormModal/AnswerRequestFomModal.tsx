import { IRequest } from '@/types/IRequest';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Box,
  IconButton,
  HStack,
  Button,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { IoMdCopy } from 'react-icons/io';
import Timer from '../timer/Timer';
import { useAnswerRequestFormModalController } from './useAnsweRequestFormModalController';

type Props = {
  request: IRequest;
  onRequestEnd: (requestId: IRequest['id']) => void;
};

const AnswerRequestFomModal: React.FC<Props> = (props) => {
  const controller = useAnswerRequestFormModalController(props);

  return (
    <Modal
      onClose={controller.onClose}
      isOpen
      isCentered
      size='full'
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign='center'>{`Pedido ${controller.request.id}`}</ModalHeader>

        <ModalBody>
          <Heading
            size='md'
            noOfLines={1}
            textAlign='center'
          >
            {controller.request.title}
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
                  onClick={controller.copyToClipboard}
                />
              </HStack>
            </CardHeader>

            <CardBody
              overflowY='auto'
              mt={2}
            >
              <Box borderRadius={4}>
                <Text textAlign='center'>{controller.request.lyrics}</Text>
              </Box>
            </CardBody>
          </Card>

          <form onSubmit={controller.handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Audio URL 1</FormLabel>
              <Input
                placeholder='Informe a URL 1'
                size='lg'
                value={controller.firstUrl}
                onChange={(event) =>
                  controller.setFirstUrl(event.currentTarget.value)
                }
              />
            </FormControl>

            <FormControl
              isRequired
              mt={6}
            >
              <FormLabel>Audio URL 2</FormLabel>
              <Input
                placeholder='Informe a URL 2'
                size='lg'
                value={controller.secondUrl}
                onChange={(event) =>
                  controller.setSecondUrl(event.currentTarget.value)
                }
              />
            </FormControl>

            <Button
              type='submit'
              width='full'
              colorScheme='teal'
              mt={8}
              mb={4}
              isLoading={controller.loading}
              disabled={controller.disableSubmit}
            >
              Enviar
            </Button>
          </form>
        </ModalBody>

        <ModalFooter
          w='full'
          bgColor='gray.300'
          justifyContent='space-between'
        >
          <Timer onExpireCb={controller.handleTimerExpiry} />

          <Button
            onClick={controller.handleUserWithTrouble}
            colorScheme='red'
          >
            Estou com problema
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AnswerRequestFomModal;
