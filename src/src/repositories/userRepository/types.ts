import { User } from '@/store/user/types';

export interface UserRepositoryInterface {
  login(email: string, password: string): Promise<boolean>;
  logout(): Promise<boolean>;
  me(): Promise<User>;
}
