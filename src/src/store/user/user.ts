import { reactive, InjectionKey } from 'vue';
import { User, UserState, UserStore } from './types';
import Repository from '@/repositories/repositoryFactory';

const state = reactive<UserState>({
  me: {
    id: 0,
    name: '',
    email: '',
  },
});

const initializeState = () => {
  state.me = {
    id: 0,
    name: '',
    email: '',
  };
};

const me = async (): Promise<User> => {
  const user = await Repository.user().me();
  state.me = user;
  return user;
};

const login = async (email: string, password: string): Promise<boolean> => {
  return await Repository.user().login(email, password);
};

const logout = async (): Promise<boolean> => {
  const ok = await Repository.user().logout();
  initializeState();

  return ok;
};

const userStore: UserStore = {
  me,
  login,
  logout,
};

export default userStore;

export const userKey: InjectionKey<UserStore> = Symbol('user');
