import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoggedInUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectLoginLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
