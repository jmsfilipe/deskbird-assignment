import { createAction, props } from "@ngrx/store";
import { User } from "../../user/user.model";

export const login = createAction('[Auth] Login', props<{ username: string, password: string }>())
export const loginSuccess = createAction('[Auth] Login successful', props<{ user: User }>())
export const loginError = createAction('[Auth] Login error', props<{ error: string }>())
