import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useApp } from '@/context/AppContext';

const mockLoginRequest = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
      reject();
    }, 1000);
  });
};

const Login: React.FC = () => {
  const toast = useToast();
  const { login } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) return;

    try {
      setLoading(true);

      await mockLoginRequest();

      login(username);
    } catch (error) {
      console.log('Erro: ', error);
      let message = 'Ocorreu um erro inesperado';

      if (error instanceof Error) {
        message = error.message;
      }

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

  const disableButton = !username || !password;

  return (
    <Flex
      width='full'
      align='center'
      justifyContent='center'
      minH='100dvh'
    >
      <Box p={2}>
        <Box textAlign='center'>
          <Heading>Login</Heading>
        </Box>
        <Box
          my={4}
          textAlign='left'
        >
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                placeholder='Digite seu usuário'
                size='lg'
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl
              isRequired
              mt={6}
            >
              <FormLabel>Senha</FormLabel>
              <Input
                type='password'
                placeholder='Digite sua senha'
                size='lg'
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </FormControl>
            <Button
              variant='outline'
              type='submit'
              width='full'
              mt={4}
              disabled={disableButton}
              isLoading={loading}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
