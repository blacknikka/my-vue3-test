import { MemoRepositoryInterface } from './types';
import { Memo, Params } from '@/store/memo/type';

export class MemoRepository implements MemoRepositoryInterface {
  private readonly ENDPOINT = 'http://localhost/api';

  private makeUrl(path: string): string {
    return `${this.ENDPOINT}${path}`;
  }

  getCookieArray() {
    const arr: { [key: string]: string } = {};
    if (document.cookie != '') {
      const tmp = document.cookie.split('; ');
      for (let i = 0; i < tmp.length; i++) {
        const data = tmp[i].split('=');
        arr[data[0]] = decodeURIComponent(data[1]);
      }
    }
    return arr;
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

  /**
   * 全Memoデータ取得
   * @returns Promise<Memo[]>
   */
  async getAll(): Promise<Memo[]> {
    // const cookie = this.getCookieArray();
    const response = await fetch(this.makeUrl('/memos'), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        // 'X-XSRF-TOKEN': cookie['XSRF-TOKEN'],
      },
      credentials: 'include',
    });

    if (response.ok) {
      const memos = (await response.json()) as Memo[];
      return Promise.resolve(memos);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }

  /**
   * Memo取得
   * @param id ID
   * @returns Memo
   */
  async get(id: number): Promise<Memo> {
    const cookie = this.getCookieArray();
    const response = await fetch(this.makeUrl(`/memos/${id}`), {
      headers: {
        'Content-type': 'application/json',
        'X-XSRF-TOKEN': cookie['XSRF-TOKEN'],
      },
      credentials: 'include',
    });

    if (response.ok) {
      const memo = (await response.json()) as Memo;
      return Promise.resolve(memo);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }

  /**
   * Memo作成
   * @param params
   * @returns Memo
   */
  async create(params: Params): Promise<Memo> {
    const memo = this.initializeMemo(params);
    const response = await fetch(this.makeUrl(`/memos/`), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(memo),
    });

    if (response.ok) {
      return Promise.resolve(memo);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }

  /**
   * Memo更新
   * @param id ID
   * @param memo 更新内容
   * @returns 更新後Memo
   */
  async update(id: number, memo: Params): Promise<Memo> {
    const updatedMemo = this.initializeMemo(memo);
    updatedMemo.title = memo.title;
    updatedMemo.body = memo.body;
    updatedMemo.status = memo.status;

    const cookie = this.getCookieArray();
    const response = await fetch(this.makeUrl(`/memos/${id}`), {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'X-XSRF-TOKEN': cookie['XSRF-TOKEN'],
      },
      credentials: 'include',
      body: JSON.stringify(updatedMemo),
    });

    if (response.ok) {
      return await Promise.resolve(updatedMemo);
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }

  /**
   * Memo削除
   * @param id ID
   * @returns void
   */
  async delete(id: number): Promise<void> {
    const cookie = this.getCookieArray();
    const response = await fetch(this.makeUrl(`/memos/${id}`), {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-XSRF-TOKEN': cookie['XSRF-TOKEN'],
      },
      credentials: 'include',
    });

    if (response.ok) {
      return Promise.resolve();
    } else {
      const err = response.json();
      throw new Error(`APi error: ${err}`);
    }
  }
}
