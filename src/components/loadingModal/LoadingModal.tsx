import {
  Modal,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
  ModalBody,
  ModalContent,
} from '@chakra-ui/react';
import React from 'react';

const LoadingModal: React.FC = () => {
  const { onClose } = useDisclosure();

  return (
    <Modal
      onClose={onClose}
      isOpen
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>Aguarde</ModalHeader>
        <ModalBody
          display='flex'
          justifyContent='center'
          p='16px'
        >
          <Spinner size='xl' />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
