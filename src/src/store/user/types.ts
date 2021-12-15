export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  me: User;
}

export interface UserStore {
  me: () => Promise<User>;
  login: (name: string, password: string) => Promise<boolean>;
}
