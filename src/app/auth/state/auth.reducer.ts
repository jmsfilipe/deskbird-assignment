import { createReducer, on } from "@ngrx/store";
import { login, loginSuccess, loginError } from "./auth.actions";
import { User } from "../../user/user.model";

export interface AuthState {
  user: User | null;
  error: any;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(loginError, (state, { error }) => ({ ...state, error, loading: false })),
);
