import { createReducer, on } from "@ngrx/store";
import { loadUsers, loadUsersSuccess, loadUsersError, editUserSuccess } from "./user.actions";
import { User } from "../../user/user.model";

export interface UserState {
  users: User[];
  error: any;
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  error: null,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(loadUsersError, (state, { error }) => ({ ...state, error, loading: false })),
  on(editUserSuccess, (state, { user }) => {
    const updatedUsers = state.users.map(u => (u.id === user.id ? user : u));
    return { ...state, users: updatedUsers };
  })
);
