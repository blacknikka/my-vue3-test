import { reactive, readonly, InjectionKey } from 'vue';
import { Memo, MemoState, MemoStore, Params } from './type';
import Repository from '@/repositories/repositoryFactory';

const state = reactive<MemoState>({
  memos: [],
});

const fetchAll = async (): Promise<Memo[]> => {
  const memos = await Repository.memo().getAll();
  state.memos = memos;
  return memos;
};

const getMemo = (id: number): Memo => {
  const found = state.memos.find((memo) => memo.id === id);
  if (!found) {
    throw new Error(`cannot find memo, id: ${id}`);
  }
  return found;
};

const addMemo = async (memo: Params) => {
  await Repository.memo().create(memo);
};

const updateMemo = async (id: number, memo: Params) => {
  await Repository.memo().update(id, memo);
};

const deleteMemo = async (id: number) => {
  await Repository.memo().delete(id);
};

const memoStore: MemoStore = {
  state: readonly(state),
  fetchAll,
  getMemo,
  addMemo,
  updateMemo,
  deleteMemo,
};

export default memoStore;

export const memoKey: InjectionKey<MemoStore> = Symbol('memo');
