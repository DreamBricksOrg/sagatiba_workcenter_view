import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useLoginController } from './useLoginController';

const Login: React.FC = () => {
  const controller = useLoginController();

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
          <form onSubmit={controller.handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Usuário</FormLabel>

              <Input
                placeholder='Digite seu e-mail'
                size='lg'
                onChange={(event) =>
                  controller.setEmail(event.currentTarget.value)
                }
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
                onChange={(event) =>
                  controller.setPassword(event.currentTarget.value)
                }
              />
            </FormControl>

            <Button
              variant='outline'
              type='submit'
              width='full'
              mt={4}
              disabled={controller.disableButton}
              isLoading={controller.loading}
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
