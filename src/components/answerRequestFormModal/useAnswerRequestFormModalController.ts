import { useDisclosure, useToast } from '@chakra-ui/react';
import { IRequest } from '@/types/IRequest';
import { useFormTimerController } from '../timer/useFormTimerController';

type Props = {
  request: IRequest;
  onRequestEnd: (requestId: IRequest['id']) => void;
};

export const useAnswerRequestFormModalController = ({
  request,
  onRequestEnd,
}: Props) => {
  const { onClose } = useDisclosure();
  const toast = useToast();

  const handleTimerExpiry = () => {
    toast({
      title: 'Chamado encerrado',
      description: 'O chamado foi encerrado por inatividade',
      status: 'error',
      variant: 'subtle',
      position: 'top-right',
    });

    onRequestEnd(request.id);
  };

  const timerData = useFormTimerController({ onExpireCb: handleTimerExpiry });

  const handleUserWithTrouble = async () => {
    // TODO - Request para encerrar chamado por problemas técnicos

    toast({
      title: 'Chamado encerrado',
      description:
        'O chamado foi relatado como encerrado devido a problema  técnico',
      status: 'error',
      variant: 'subtle',
      position: 'top-right',
    });

    onRequestEnd(request.id);
  };

  return {
    request,
    timerData,
    onClose,
    handleTimerExpiry,
    handleUserWithTrouble,
  };
};
