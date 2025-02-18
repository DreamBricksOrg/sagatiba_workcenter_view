import { useEffect, useState } from 'react';
import { IRequest } from '@/types/IRequest';
import { useToast } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import RequestService from '@/services/RequestService';

let socket: ReturnType<typeof io> | undefined;
const NOTIFICATION_SOUND = new Audio('./sounds/notification_sound.wav');

const copyToClipboard = async (lyrics: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(lyrics);
    return true;
  } catch {
    return false;
  }
};

export const useRequestsListController = () => {
  const toast = useToast();
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest | null>(null);

  const handleAcceptClick = async () => {
    if (!requests.length) return;

    const request = requests[0];

    let toastTitle = 'Pedido aceito';
    let toastMessage = 'A letra foi copiada para área de transferência';
    let toastStatus: 'error' | 'success' = 'success';

    try {
      setLoading(true);

      const response = await RequestService.acceptRequest();

      setCurrentRequest(response.task);

      const copySuccess = await copyToClipboard(request.lyrics);

      if (!copySuccess) {
        toastMessage = 'Não foi possível copiar a letra';
      }
    } catch (error) {
      console.log(error);
      toastTitle = 'Erro ao aceitar pedido';
      toastMessage = 'Não foi possível aceitar o pedido';
      toastStatus = 'error';
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

  const handleCloseRequest = () => {
    setCurrentRequest(null);
  };

  const onConnection = () => {
    socket.emit('get_queue');
  };

  useEffect(() => {
    socket = io('ws://18.229.132.107:5001');

    socket.on('connect', () => {
      onConnection();
    });

    socket.on('queue_list', (response: IRequest[]) => {
      console.log('queue_list quantity:', response.length);
      NOTIFICATION_SOUND.play();
      setRequests(response);
    });

    socket.on('error_message', (response) => {
      console.log('error_message', response);
    });

    socket.on('error', (error) => {
      console.log('error', error);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    requests,
    loading,
    currentRequest,
    handleAcceptClick,
    handleCloseRequest,
  };
};
