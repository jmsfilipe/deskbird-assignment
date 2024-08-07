import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export const loadUsers = createAction('[User] Load users');
export const loadUsersSuccess = createAction('[User] Load users successful', props<{ users: User[] }>());
export const loadUsersError = createAction('[User] Load users error', props<{ error: string }>());

export const editUser = createAction('[User] Edit user', props<{ user: User }>());
export const editUserSuccess = createAction('[User] Edit user successful', props<{ user: User }>());
export const editUserError = createAction('[User] Edit user error', props<{ error: string }>());
