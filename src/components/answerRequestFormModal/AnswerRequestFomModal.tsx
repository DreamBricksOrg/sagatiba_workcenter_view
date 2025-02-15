import { IRequest } from '@/types/IRequest';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Box,
  IconButton,
  HStack,
  useToast,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';
import { IoMdCopy } from 'react-icons/io';
import Timer from '../timer/Timer';

type Props = {
  request: IRequest;
};

const AnswerRequestFomModal: React.FC<Props> = ({ request }) => {
  const { onClose } = useDisclosure();
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
      });
    }
  };

  request.lyrics =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta tortor nunc, sed facilisis turpis porta in. Fusce consequat elit sed elit varius, nec ultrices arcu fringilla. Mauris id lobortis orci. Suspendisse convallis eget dolor sed ultrices. Curabitur porttitor tortor velit, nec dapibus risus accumsan ac. In sagittis nisl eu risus aliquet semper. Vestibulum dapibus mollis ligula a finibus. Ut vel vulputate mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque malesuada scelerisque cursus.Fusce mattis justo in eros accumsan viverra. Duis convallis augue malesuada orci porttitor scelerisque. Aenean placerat ante eu porta sollicitudin. Pellentesque eu est justo. Fusce augue nulla, euismod vel fringilla sit amet, sollicitudin id ante. Proin condimentum, ante et cursus scelerisque, justo metus efficitur lectus, ac accumsan leo libero euismod ligula. Quisque iaculis ligula nec facilisis iaculis. Ut viverra efficitur neque, nec porttitor mi dictum a. Aenean euismod, mauris a sollicitudin molestie, risus orci ultrices elit, in semper erat tellus nec felis. Cras auctor diam at lectus convallis, in porttitor purus sodales. Aliquam a gravida turpis. Quisque sit amet faucibus lorem. Donec sed posuere ante. Curabitur euismod finibus ullamcorper. Nullam in ullamcorper mauris. Curabitur metus est, fringilla eu enim pellentesque, sagittis laoreet orci. Sed sed risus sem. Vivamus libero ante, malesuada non magna sed, porta commodo ex. Duis eu ante at enim aliquet tincidunt. Praesent ac sollicitudin elit. Aenean posuere nulla elementum lacinia faucibus. Ut porta blandit vulputate. Etiam purus libero, molestie sed blandit cursus, molestie eu urna. Praesent finibus dolor ac mattis convallis. Fusce vel orci non arcu accumsan auctor. Vivamus blandit dolor et interdum gravida. Nunc enim nibh, tincidunt vitae consequat non, condimentum eu dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam lobortis eget odio at fringilla. Phasellus pulvinar sapien in vehicula bibendum. Donec id odio aliquam, venenatis risus at, tincidunt nulla. Cras odio tellus, bibendum tincidunt sollicitudin vel, aliquam sed lectus.';

  return (
    <Modal
      onClose={onClose}
      isOpen
      isCentered
      size='full'
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign='center'>{`Pedido ${request.id}`}</ModalHeader>

        <ModalBody>
          <Heading
            size='md'
            noOfLines={2}
            textAlign='center'
          >
            {request.title}
          </Heading>

          <Card
            mt={8}
            bgColor='gray.100'
            maxH='xl'
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
                <Text textAlign='center'>{request.lyrics}</Text>
              </Box>
            </CardBody>
          </Card>
        </ModalBody>

        <ModalFooter
          w='full'
          bgColor='gray.300'
          justifyContent='space-between'
        >
          <Timer />

          <Button
            onClick={onClose}
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
