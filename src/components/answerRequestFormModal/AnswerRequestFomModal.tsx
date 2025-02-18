import { IRequest } from '@/types/IRequest';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';
import Timer from '../timer/Timer';
import { useAnswerRequestFormModalController } from './useAnswerRequestFormModalController';
import AudiosForm from '../audiosForm/AudiosForm';
import RequestDetailsCard from '../requestDetailsCard/RequestDetailsCard';

type Props = {
  request: IRequest;
  onRequestEnd: () => void;
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
          <RequestDetailsCard request={controller.request} />

          <AudiosForm
            request={controller.request}
            pauseTimer={controller.timerData.pause}
            resumeTimer={controller.timerData.handleMoreTime}
            onSubmitSuccess={props.onRequestEnd}
          />
        </ModalBody>

        <ModalFooter
          w='full'
          bgColor='gray.300'
          justifyContent='space-between'
        >
          <Timer {...controller.timerData} />

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
