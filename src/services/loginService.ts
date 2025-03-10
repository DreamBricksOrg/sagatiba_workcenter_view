import api from '@/api';
import { IUser, IUserJson } from '@/types/IUser';
import { jwtDecode } from 'jwt-decode';

export type IUserSignIn = {
  email: string;
  password: string;
};

export default class LoginService {
  static async signIn(user: IUserSignIn): Promise<IUser> {
    const response = await api.post<{ message: string; token: string }>(
      '/users/worker/login',
      {
        email: user.email,
        password: user.password,
      }
    );

    const { data } = response;

    const userResponse: IUserJson = jwtDecode(data.token);

    return {
      id: userResponse.user_oid,
      email: userResponse.email,
    };
  }
}
