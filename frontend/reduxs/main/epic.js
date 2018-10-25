import { of, from } from 'rxjs'
import { switchMap, catchError, takeUntil, map } from 'rxjs/operators'
import axios from 'axios'
import { MAIN_DONE, MAIN_INIT, mainDone, MAIN_ERROR } from './action'
const API_URL = process.env.API_URL || 'localhost:9000'

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
            url: `${API_URL}/api`,
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
