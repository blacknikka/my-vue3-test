import { DeepReadonly } from "vue";

export type status = "doing" | "done" | "pending";

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

export type Params = Pick<Memo, "title" | "body" | "status">;

export interface MemoStore {
  state: DeepReadonly<MemoState>;
  getMemo: (id: number) => void;
  addMemo: (memo: Params) => void;
  updateMemo: (id: number, memo: Memo) => void;
  deleteMemo: (id: number) => void;
}
