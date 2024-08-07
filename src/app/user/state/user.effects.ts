import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, delay, tap } from 'rxjs/operators';
import { UserService } from '../../user/services/user.service';
import { loadUsers, loadUsersError, loadUsersSuccess } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          delay(Math.random() * 2000), // simulate random delay
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersError({ error })))
        )
      )
    )
  );
}
