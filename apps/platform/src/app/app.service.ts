import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

export type AppState = {
  user?: string;
  data?: { id: string; display: string }[];
};

@Injectable({ providedIn: 'root' })
export class AppService {
  private _store = new BehaviorSubject<AppState>({});

  public get query(): Observable<AppState> {
    return this._store.asObservable();
  }

  public select<R>(project: (state: AppState) => R): Observable<R> {
    return this.query.pipe(map(project), distinctUntilChanged());
  }

  public update(state: Partial<AppState>): void {
    this._store.next({ ...this._store.value, ...state });
  }
}
