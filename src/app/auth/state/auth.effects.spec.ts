// src/app/state/effects/auth.effects.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { logout, logoutSuccess } from './auth.actions';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    router = TestBed.inject(Router);
  });

  it('should navigate to login on logout', (done) => {
    actions$ = of(logout());

    effects.logout$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
