import { MemoRepositoryInterface } from '@/repositories/memoRepository/types';
import { MemoRepository } from '@/repositories/memoRepository/local';

export class Repositories {
  private memoRepository: MemoRepositoryInterface;

  constructor(memo: MemoRepositoryInterface) {
    this.memoRepository = memo;
  }

  memo(): MemoRepositoryInterface {
    return this.memoRepository;
  }
}

export default new Repositories(new MemoRepository());
