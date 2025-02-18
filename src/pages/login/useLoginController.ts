import { useApp } from '@/context/AppContext';
import LoginService from '@/services/loginService';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';

export const useLoginController = () => {
  const toast = useToast();
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) return;

    try {
      setLoading(true);

      const user = await LoginService.signIn({ email, password });

      login(user);
    } catch (err) {
      const error = err as AxiosError;

      console.log('Erro: ', error);
      const message = error.message;

      toast({
        title: 'Falha no login',
        description: message,
        status: 'error',
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const disableButton = !email || !password;

  return { loading, disableButton, setEmail, setPassword, handleSubmit };
};
