import { makeAutoObservable } from 'mobx';

export class CountStore {
  count: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }
}

export const countStore = new CountStore();
