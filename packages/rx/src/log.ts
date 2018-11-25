import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const log = <T>(name: string) => (
  obs: Observable<T>
  // tslint:disable-next-line:no-console
) => obs.pipe(tap((...args: any[]) => console.log(name, ...args)));
