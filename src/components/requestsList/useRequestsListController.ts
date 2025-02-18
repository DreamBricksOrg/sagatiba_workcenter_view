import { useEffect, useState } from 'react';
import { IRequest } from '@/types/IRequest';
import { useToast } from '@chakra-ui/react';
import { io } from 'socket.io-client';
let socket;

const NOTIFICATION_SOUND = new Audio('./sounds/notification_sound.wav');

const copyToClipboard = async (lyrics: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(lyrics);
    return true;
  } catch {
    return false;
  }
};

const mockAcceptRequest = async () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.5;

      if (success) resolve();

      reject();
    }, 1000);
  });
};

export const useRequestsListController = () => {
  const toast = useToast();
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest | null>(null);

  const handleAcceptClick = async (request: IRequest) => {
    let toastTitle = 'Pedido aceito';
    let toastMessage = 'A letra foi copiada para área de transferência';
    let toastStatus: 'error' | 'success' = 'success';

    try {
      setLoading(true);

      // TODO - Implementar request para aceitar
      await mockAcceptRequest();

      setCurrentRequest(request);

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

  // const mockNewRequestEvents = () => {
  //   intervalRef.current = setInterval(() => {
  //     const newRequest =
  //       requestsListMock[Math.floor(Math.random() * requestsListMock.length)];

  //     setRequests((oldState) => {
  //       if (oldState.some((request) => request.id === newRequest.id)) {
  //         return oldState; // Retorna o estado anterior se o pedido já existir
  //       }

  //       return [...oldState, newRequest];
  //     });

  //     if (!currentRequest) {
  //       NOTIFICATION_SOUND.play();
  //     }
  //   }, 30 * 1000);
  // };

  const handleCloseRequest = (requestId: IRequest['id']) => {
    setRequests((oldState) =>
      oldState.filter((request) => request.id !== requestId)
    );
    setCurrentRequest(null);
  };

  const onConnection = () => {
    console.log('onConnection');
    socket.emit('get_queue');
  };

  // MOCK PARA GERAR PEDIDOS
  // useEffect(() => {
  //   mockNewRequestEvents();

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, [currentRequest]);

  useEffect(() => {
    socket = io('ws://18.229.132.107:5001');

    socket.on('connect', () => {
      console.log(socket.connected);
      onConnection();
    });

    socket.on('queue_list', (response) => {
      console.log('queue_list', response);
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
