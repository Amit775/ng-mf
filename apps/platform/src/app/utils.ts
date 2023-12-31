import { Type } from '@angular/core';
import { DefaultExport, Routes } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { Observable, isObservable, from, of, map, tap } from 'rxjs';

export function isPromise<T = unknown>(obj: unknown): obj is Promise<T> {
  // allow any Promise/A+ compliant thenable.
  // It's up to the caller to ensure that obj.then conforms to the spec
  return (
    !!obj && typeof (obj as { then: () => Promise<T> }).then === 'function'
  );
}

export function loadDefaultRemoteEntry<T>(
  remoteName: string,
  moduleName: string
): Observable<Routes> {
  return wrapIntoObservable(loadRemoteModule(remoteName, moduleName)).pipe(
	tap(console.log),
	map(maybeUnwrapDefaultExport),
	tap(console.log)
  );
}

export function wrapIntoObservable<T>(
  value: T | Promise<T> | Observable<T>
): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    // Use `Promise.resolve()` to wrap promise-like instances.
    // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
    // change detection.
    return from(Promise.resolve(value));
  }

  return of(value);
}
function isWrappedDefaultExport<T>(
  value: T | DefaultExport<T>
): value is DefaultExport<T> {
  // We use `in` here with a string key `'default'`, because we expect `DefaultExport` objects to be
  // dynamically imported ES modules with a spec-mandated `default` key. Thus we don't expect that
  // `default` will be a renamed property.
  return value && typeof value === 'object' && 'default' in value;
}

export function maybeUnwrapDefaultExport<T>(input: T | DefaultExport<T>): T {
  // As per `isWrappedDefaultExport`, the `default` key here is generated by the browser and not
  // subject to property renaming, so we reference it with bracket access.
  return isWrappedDefaultExport(input) ? input['default'] : input;
}
