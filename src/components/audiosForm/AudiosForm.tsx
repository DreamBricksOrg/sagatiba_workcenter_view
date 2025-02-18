import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { useAudiosFormController } from './useAudiosFormController';

type Props = {
  pauseTimer: () => void;
  resumeTimer: () => void;
  onSubmitSuccess: () => void;
};

const AudiosForm: React.FC<Props> = (props) => {
  const controller = useAudiosFormController(props);

  return (
    <form onSubmit={controller.handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Audio URL 1</FormLabel>
        <Input
          placeholder='Informe a URL 1'
          size='lg'
          value={controller.firstUrl}
          onChange={(event) =>
            controller.setFirstUrl(event.currentTarget.value)
          }
        />
      </FormControl>

      <FormControl
        isRequired
        mt={6}
      >
        <FormLabel>Audio URL 2</FormLabel>
        <Input
          placeholder='Informe a URL 2'
          size='lg'
          value={controller.secondUrl}
          onChange={(event) =>
            controller.setSecondUrl(event.currentTarget.value)
          }
        />
      </FormControl>

      <Button
        type='submit'
        width='full'
        colorScheme='teal'
        mt={8}
        mb={4}
        isLoading={controller.loading}
        disabled={controller.disableSubmit}
      >
        Enviar
      </Button>
    </form>
  );
};

export default AudiosForm;
