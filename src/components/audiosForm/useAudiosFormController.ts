import { useApp } from '@/context/AppContext';
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

const convertToCdnUrl = (originalUrl: string): string | null => {
  const match = originalUrl.match(/suno\.com\/song\/([\w-]+)/);
  return match ? `https://cdn1.suno.ai/${match[1]}.mp3` : null;
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

  const { user } = useApp();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstUrl.length || !secondUrl.length) return;

    const convertedFirstUrl = convertToCdnUrl(firstUrl);
    const convertedSecondUrl = convertToCdnUrl(secondUrl);

    if (!convertedFirstUrl || !convertedSecondUrl) {
      toast({
        title: 'URL inválida',
        description: 'Certifique-se de inserir URLs válidos do Suno.',
        status: 'error',
        variant: 'subtle',
        position: 'top-right',
        duration: 3000,
      });
      return;
    }

    let toastTitle = 'Resultado enviado';
    let toastMessage = 'Chamado concluído com sucesso';
    let toastStatus: 'error' | 'success' = 'success';

    try {
      setLoading(true);
      pauseTimer();

      console.log('Enviando os seguintes links convertidos:');
      console.log(`1º: ${convertedFirstUrl}`);
      console.log(`2º: ${convertedSecondUrl}`);

      // TODO - Requisição para enviar resultado usando os novos links
      // await mockSendResult();

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
