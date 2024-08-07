import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';
import { UserEffects } from './user/state/user.effects';
import { provideHttpClient } from "@angular/common/http";
import { authReducer } from './auth/state/auth.reducer';
import { userReducer } from './user/state/user.reducer';

// Create a meta-reducer for local storage synchronization
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['auth', 'users'],
    rehydrate: true
  })(reducer);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer, users: userReducer }, { metaReducers: [localStorageSyncReducer] }),
    provideEffects([AuthEffects, UserEffects])
  ]
};
