import api from '@/api';
import { IRequest } from '@/types/IRequest';

type IProcessTaskResponse = {
  status: string;
  task: IRequest;
};

type IFailTaskBody = {
  id: string;
  phone: string;
  lyrics: string;
  user_oid: string;
};

export default class RequestService {
  static acceptRequest = async (): Promise<IProcessTaskResponse> => {
    const response = await api.post<IProcessTaskResponse>('/tasks/process');
    return response.data;
  };

  static async taskCompleted(success: boolean, id: string): Promise<void> {
    return await api.post('/tasks/complete', {
      id,
      success,
    });
  }

  static async taskFail(body: IFailTaskBody): Promise<void> {
    return await api.post('/tasks/fail', body);
  }
}
