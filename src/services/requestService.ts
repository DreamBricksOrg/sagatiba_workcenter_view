import api from '@/api';

export default class RequestService {
  static processTask = async () => {
    try {
      const response = await api.post('/tasks/process');
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  task_completed = async (success: boolean, task_id: string) => {
    try {
      const response = await api.post('/tasks/completed', {
        task_id,
        success,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  requeue_task = async (task_id: string) => {
    try {
      const response = await api.post('/tasks/requeue', { task_id });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
