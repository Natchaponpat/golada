import { of, from } from 'rxjs'
import { switchMap, catchError, takeUntil, map } from 'rxjs/operators'
import axios from 'axios'
import { MAIN_DONE, MAIN_INIT, mainDone, MAIN_ERROR } from './action'

export const mainInitEpic = (action$, state$, { url }) =>
  action$
    //
    .ofType(MAIN_INIT)
    //
    .pipe(
      //
      switchMap(() =>
        from(
          axios({
            url: `${url}/api`,
            method: 'GET',
          }),
        ).pipe(
          //
          map(result => mainDone(result.data)),
          //
          catchError(error => {
            console.log('error', error)
            return of({ type: MAIN_ERROR, error })
          }),
        ),
      ),
    )
