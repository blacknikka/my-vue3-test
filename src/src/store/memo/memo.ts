import { reactive, readonly, InjectionKey } from 'vue';
import { Memo, MemoState, MemoStore, Params } from './type';

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

const state = reactive<MemoState>({
  memos: mockMemo,
});

const initializeMemo = (memo: Params): Memo => {
  const date = new Date();
  return {
    id: date.getTime(),
    title: memo.title,
    body: memo.body,
    status: memo.status,
    createdAt: date,
    updatedAt: date,
  } as Memo;
};

const getMemo = (id: number): Memo => {
  const found = state.memos.find((memo) => memo.id === id);
  if (!found) {
    throw new Error(`cannot find memo, id: ${id}`);
  }
  return found;
};

const addMemo = (memo: Params) => {
  state.memos.push(initializeMemo(memo));
};

const updateMemo = (id: number, memo: Memo) => {
  const index = state.memos.findIndex((memo) => memo.id === id);
  if (index === -1) {
    throw new Error(`[update] cannot find memo, id: ${id}`);
  }

  state.memos[index].id = id
  state.memos[index].title = memo.title;
  state.memos[index].body = memo.body;
  state.memos[index].status = memo.status;
  state.memos[index].updatedAt = new Date();
};

const deleteMemo = (id: number) => {
  const index = state.memos.findIndex((memo) => memo.id === id);
  if (index === -1) {
    throw new Error(`[delete] cannot find memo, id: ${id}`);
  }
  state.memos.splice(index, 1);
};

const memoStore: MemoStore = {
  state: readonly(state),
  getMemo,
  addMemo,
  updateMemo,
  deleteMemo,
};

export default memoStore;

export const memoKey: InjectionKey<MemoStore> = Symbol('todo');
