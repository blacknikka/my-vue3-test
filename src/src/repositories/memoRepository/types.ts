import { Memo, Params } from '@/store/memo/type';

export interface MemoRepositoryInterface {
  getAll(): Promise<Memo[]>;
  get(id: number): Promise<Memo>;
  create(params: Params): Promise<Memo>;
  update(id: number, memo: Params): Promise<Memo>;
  delete(id: number): Promise<void>;
}
