import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

export type RowData = {
  id: string;
  display: string;
};

export type AppState = {
  user: string;
  data: RowData[];
};

const initalState = (): AppState => ({ data: [], user: '' });

@Injectable()
export class StoreService {
  private _store = new BehaviorSubject<AppState>(initalState());

  public get query(): Observable<AppState> {
    return this._store.asObservable();
  }

  public select<R>(project: (state: AppState) => R): Observable<R> {
    return this.query.pipe(map(project), distinctUntilChanged());
  }

  public get<R>(project: (state: AppState) => R): R {
    return project(this._store.value);
  }

  public update(state: Partial<AppState>): void {
    this._store.next({ ...this._store.value, ...state });
  }
}
