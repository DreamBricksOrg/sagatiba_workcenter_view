import { useEffect, useState, useRef } from 'react';
import { IRequest } from '@/types/IRequest';
import { useToast } from '@chakra-ui/react';
import { io, Socket } from 'socket.io-client';
import RequestService from '@/services/requestService';

const NOTIFICATION_SOUND = new Audio('./sounds/notification_sound.wav');

const WS_BASE_URL =
  typeof window !== 'undefined'
    ? window.location.hostname.includes('localhost')
      ? 'ws://localhost:5001'
      : 'wss://sagatibamusicapi.zapto.org:5001'
    : 'wss://sagatibamusicapi.zapto.org:5001';

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
  const socketRef = useRef<Socket | null>(null);

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
    socketRef.current?.emit('get_queue');
  };

  useEffect(() => {
    const socket = io(WS_BASE_URL, {
      transports: ['websocket'],
      secure: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket conectado');
      onConnection();
    });

    socket.on('queue_list', (response: IRequest[]) => {
      setRequests((oldRequests) => {
        const newRequestIds = new Set(response.map((r) => r.id));
        const oldRequestIds = new Set(oldRequests.map((r) => r.id));

        const isNew = [...newRequestIds].some((id) => !oldRequestIds.has(id));
        if (isNew) {
          NOTIFICATION_SOUND.play();
        }

        return response;
      });
    });

    socket.on('error_message', (response) => {
      console.error('error_message', response);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error', error);
    });

    socket.on('disconnect', (reason) => {
      console.warn('WebSocket desconectado:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('Erro na conexão WebSocket:', error);
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
