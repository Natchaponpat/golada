import { of, from } from 'rxjs'
import { switchMap, catchError, takeUntil } from 'rxjs/operators'
import router from 'next/router'
import axios from 'axios'
import { MAIN_DONE, MAIN_INIT , mainDone,mainError } from './action'

export const configureEpic = (action$, state$, { url, postJson }) =>
  action$
    //
    .ofType(MAIN_INIT)
    //
    .pipe(
      //
      switchMap(() =>
        from(
          axios({
            url: `http://${url}`,
            method: 'GET',
          }),
        )
          //
          .pipe(
            //
            switchMap(() => {
              return of(mainDone())
            }),

            takeUntil(action$.ofType(MAIN_DONE )),

            catchError(_error => {
              console.log('error', _error)
              return of(mainError({ error: _error.message }))
            }),
          ),
      ),
    )
