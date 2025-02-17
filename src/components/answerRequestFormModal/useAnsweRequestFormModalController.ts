import { useState, FormEvent } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { IRequest } from '@/types/IRequest';

const mockSendResult = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.5;

      if (success) resolve();

      reject();
    }, 1000);
  });
};

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

  const [firstUrl, setFirstUrl] = useState('');
  const [secondUrl, setSecondUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const disableSubmit = !firstUrl.length || !secondUrl.length;

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstUrl.length || !secondUrl.length) return;

    let toastTitle = 'Resultado enviado';
    let toastMessage = 'Chamado concluído com sucesso';
    let toastStatus: 'error' | 'success' = 'success';

    try {
      setLoading(true);

      // TODO - Requisição para enviar resultado
      await mockSendResult();

      onRequestEnd(request.id);
    } catch (error) {
      let errorMessage = 'ocorreu uma falha inesperada';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toastStatus = 'error';
      toastTitle = 'Falha ao enviar resposta';
      toastMessage = `Erro: ${errorMessage}`;
    } finally {
      setLoading(false);

      toast({
        title: toastTitle,
        description: toastMessage,
        status: toastStatus,
        variant: 'subtle',
        position: 'top-right',
        duration: 3000,
      });
    }
  };

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

  const handleTimerExpiry = () => {
    // TODO - Verificar qual é o comportamento desejado

    toast({
      title: 'Chamado encerrado',
      description: 'O chamado foi encerrado por inatividade',
      status: 'error',
      variant: 'subtle',
      position: 'top-right',
    });

    onRequestEnd(request.id);
  };

  return {
    request,
    loading,
    firstUrl,
    secondUrl,
    disableSubmit,
    setFirstUrl,
    setSecondUrl,
    onClose,
    handleSubmit,
    handleTimerExpiry,
    handleUserWithTrouble,
    copyToClipboard,
  };
};
