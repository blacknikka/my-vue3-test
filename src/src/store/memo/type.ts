import { DeepReadonly } from 'vue';

export type status = 'doing' | 'done' | 'pending';

export interface Memo {
  id: number;
  title: string;
  body: string;
  status: status;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoState {
  memos: Memo[];
}

export type Params = Pick<Memo, 'title' | 'body' | 'status'>;

export interface MemoStore {
  state: DeepReadonly<MemoState>;
  fetchAll: () => Promise<Memo[]>;
  getMemo: (id: number) => Memo;
  addMemo: (memo: Params) => void;
  updateMemo: (id: number, memo: Params) => void;
  deleteMemo: (id: number) => void;
}
