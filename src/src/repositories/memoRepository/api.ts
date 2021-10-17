import { MemoRepositoryInterface } from './types';
import { Memo, Params } from '@/store/memo/type';

export class MemoRepository implements MemoRepositoryInterface {
  private readonly ENDPOINT = 'http://localhost:3000';

  private makeUrl(path: string): string {
    return `${this.ENDPOINT}${path}`;
  }

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
    const response = await fetch(this.makeUrl('/memos'), {
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      const memos = (await response.json()) as Memo[];
      return Promise.resolve(memos);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }

  async get(id: number): Promise<Memo> {
    const response = await fetch(this.makeUrl(`/memos/${id}`), {
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      const memo = (await response.json()) as Memo;
      return Promise.resolve(memo);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }
  async create(params: Params): Promise<Memo> {
    const memo = this.initializeMemo(params);
    const response = await fetch(this.makeUrl(`/memos/`), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(memo),
    });

    if (response.ok) {
      return Promise.resolve(memo);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }
  async update(id: number, memo: Params): Promise<Memo> {
    const updatedMemo = await this.get(id);
    updatedMemo.id = id;
    updatedMemo.title = memo.title;
    updatedMemo.body = memo.body;
    updatedMemo.status = memo.status;
    updatedMemo.updatedAt = new Date();

    const response = await fetch(this.makeUrl(`/memos/${id}`), {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedMemo),
    });

    if (response.ok) {
      return await Promise.resolve(updatedMemo);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }
  async delete(id: number): Promise<void> {
    const response = await fetch(this.makeUrl(`/memos/${id}`), {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      return Promise.resolve();
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }
}
