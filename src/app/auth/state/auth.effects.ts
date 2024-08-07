import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, delay, tap } from 'rxjs/operators';
import { login, loginSuccess, loginError } from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) => {
        const user = this.authService.authenticate(username, password);
        if (user) {
          return of(loginSuccess({ user })).pipe(delay(Math.random() * 2000)); // simulate random delay
        } else {
          return of(loginError({ error: 'Invalid credentials' })).pipe(delay(Math.random() * 2000)); // simulate random delay
        }
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate(['/users']);
      })
    ),
    { dispatch: false } // this effect does not dispatch an action
  );
}
