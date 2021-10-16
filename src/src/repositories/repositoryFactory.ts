import { MemoRepositoryInterface } from '@/repositories/memoRepository/types';
import { MemoRepository as MemoRepositoryLocal } from '@/repositories/memoRepository/local';
import { MemoRepository as MemoRepositoryApi } from '@/repositories/memoRepository/api';

export class Repositories {
  private memoRepository: MemoRepositoryInterface;

  constructor(memo: MemoRepositoryInterface) {
    this.memoRepository = memo;
  }

  memo(): MemoRepositoryInterface {
    return this.memoRepository;
  }
}

const repositories =
  process.env.NODE_ENV == 'local'
    ? new Repositories(new MemoRepositoryLocal())
    : new Repositories(new MemoRepositoryApi());
export default repositories;
