import { useDisclosure, useToast } from '@chakra-ui/react';
import { IRequest } from '@/types/IRequest';
import { useFormTimerController } from '../timer/useFormTimerController';
import RequestService from '@/services/RequestService';
import { useApp } from '@/context/AppContext';

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

  const { user } = useApp();

  const handleTimerExpiry = async () => {
    let title = 'Chamado encerrado';
    let description = 'O chamado foi encerrado por inatividade';
    let status: 'warning' | 'error' = 'warning';

    try {
      await RequestService.taskCompleted(false, request.id);
      onRequestEnd(request.id);
    } catch (error) {
      console.log(error);
      title = 'Erro ao encerrar chamado';
      description = 'O chamado foi encerrado por inatividade';
      status = 'error';
    } finally {
      toast({
        title,
        description,
        status,
        variant: 'subtle',
        position: 'top-right',
      });
    }
  };

  const timerData = useFormTimerController({ onExpireCb: handleTimerExpiry });

  const handleUserWithTrouble = async () => {
    let toastTitle = 'Chamado encerrado';
    let toastMessage =
      'O chamado foi relatado como encerrado devido a problema  técnico';
    let toastStatus: 'warning' | 'error' = 'warning';

    try {
      await RequestService.taskFail({
        id: request.id,
        user_oid: user?.id ?? '',
        lyrics: request.lyrics,
        phone: request.phone,
      });
      onRequestEnd(request.id);
    } catch (error) {
      toastStatus = 'error';
      toastTitle = 'Falha ao encerrar chamado';
      console.log(error);
      toastMessage = 'Ocorreu um erro inesperado, por favor, tente novamente';
    } finally {
      toast({
        title: toastTitle,
        description: toastMessage,
        status: toastStatus,
        variant: 'subtle',
        position: 'top-right',
      });
    }
  };

  return {
    request,
    timerData,
    onClose,
    handleTimerExpiry,
    handleUserWithTrouble,
  };
};
