import { createReducer, on } from "@ngrx/store";
import { logout, login, loginSuccess, loginError, logoutSuccess } from "./auth.actions";
import { User } from "../../user/user.model";

export interface AuthState {
  user: User | null;
  error: any;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(loginError, (state, { error }) => ({ ...state, error, loading: false })),
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, state => ({ ...state, user: null, loading: false }))
);
