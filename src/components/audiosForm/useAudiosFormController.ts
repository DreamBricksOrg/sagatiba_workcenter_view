import { useToast } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

type Props = {
  pauseTimer: () => void;
  resumeTimer: () => void;
  onSubmitSuccess: () => void;
};

const mockSendResult = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.5;

      if (success) resolve();

      reject();
    }, 5000);
  });
};

export const useAudiosFormController = ({
  pauseTimer,
  resumeTimer,
  onSubmitSuccess,
}: Props) => {
  const toast = useToast();

  const [firstUrl, setFirstUrl] = useState('');
  const [secondUrl, setSecondUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const disableSubmit = !firstUrl.length || !secondUrl.length;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstUrl.length || !secondUrl.length) return;

    let toastTitle = 'Resultado enviado';
    let toastMessage = 'Chamado concluído com sucesso';
    let toastStatus: 'error' | 'success' = 'success';

    try {
      setLoading(true);
      pauseTimer();

      // TODO - Requisição para enviar resultado
      await mockSendResult();

      onSubmitSuccess();
    } catch (error) {
      let errorMessage = 'ocorreu uma falha inesperada';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toastStatus = 'error';
      toastTitle = 'Falha ao enviar resposta';
      toastMessage = `Erro: ${errorMessage}`;
      resumeTimer();
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

  return {
    firstUrl,
    secondUrl,
    loading,
    disableSubmit,
    setFirstUrl,
    setSecondUrl,
    handleSubmit,
  };
};
