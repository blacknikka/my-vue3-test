import { MemoRepositoryInterface } from './types';
import { Memo, Params } from '@/store/memo/type';

const mockMemo: Memo[] = [
  {
    id: 1,
    title: 'title1',
    body: '1st',
    status: 'doing',
    createdAt: new Date('2021-10-08'),
    updatedAt: new Date('2021-10-08'),
  },
  {
    id: 2,
    title: 'title2',
    body: '2nd',
    status: 'done',
    createdAt: new Date('2021-10-09'),
    updatedAt: new Date('2021-10-09'),
  },
  {
    id: 3,
    title: 'title3',
    body: '3rd',
    status: 'done',
    createdAt: new Date('2021-10-10'),
    updatedAt: new Date('2021-10-10'),
  },
];

export class MemoRepository implements MemoRepositoryInterface {
  private initializeMemo(memo: Params): Memo {
    const date = new Date();
    return {
      id: date.getTime(),
      title: memo.title,
      body: memo.body,
      status: memo.status,
      createdAt: date,
      updatedAt: date,
    } as Memo;
  }

  async getAll(): Promise<Memo[]> {
    return await Promise.resolve(mockMemo);
  }
  async get(id: number): Promise<Memo> {
    const found = mockMemo.find((memo) => memo.id === id);
    if (!found) {
      throw new Error(`cannot find memo, id: ${id}`);
    }
    return await Promise.resolve(found);
  }
  async create(params: Params): Promise<Memo> {
    const memo = this.initializeMemo(params);
    mockMemo.push(memo);
    return await Promise.resolve(memo);
  }
  async update(id: number, memo: Params): Promise<Memo> {
    const index = mockMemo.findIndex((memo) => memo.id === id);
    if (index === -1) {
      throw new Error(`[update] cannot find memo, id: ${id}`);
    }

    mockMemo[index].id = id;
    mockMemo[index].title = memo.title;
    mockMemo[index].body = memo.body;
    mockMemo[index].status = memo.status;
    mockMemo[index].updatedAt = new Date();
    return await Promise.resolve(mockMemo[index]);
  }
  async delete(id: number): Promise<void> {
    const index = mockMemo.findIndex((memo) => memo.id === id);
    if (index === -1) {
      throw new Error(`[delete] cannot find memo, id: ${id}`);
    }
    mockMemo.splice(index, 1);

    return await Promise.resolve();
  }
}
