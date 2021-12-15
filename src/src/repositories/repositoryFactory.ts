import { MemoRepositoryInterface } from '@/repositories/memoRepository/types';
import { UserRepositoryInterface } from '@/repositories/userRepository/types';
import { MemoRepository as MemoRepositoryLocal } from '@/repositories/memoRepository/local';
import { MemoRepository as MemoRepositoryApi } from '@/repositories/memoRepository/api';
import { UserRepository } from './userRepository/api';

export class Repositories {
  private memoRepository: MemoRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(memo: MemoRepositoryInterface, user: UserRepositoryInterface) {
    this.memoRepository = memo;
    this.userRepository = user;
  }

  memo(): MemoRepositoryInterface {
    return this.memoRepository;
  }

  user(): UserRepositoryInterface {
    return this.userRepository;
  }
}

const repositories =
  process.env.NODE_ENV == 'local'
    ? new Repositories(new MemoRepositoryLocal(), new UserRepository())
    : new Repositories(new MemoRepositoryApi(), new UserRepository());
export default repositories;
