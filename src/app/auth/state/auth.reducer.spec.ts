import { authReducer, AuthState, initialState } from './auth.reducer';
import { loginSuccess, loginError, logoutSuccess } from './auth.actions';
describe('AuthReducer', () => {
  it('should handle loginSuccess', () => {
    const user = { username: 'admin', name: 'Admin', password: '1', id: '1', role: 'admin' };
    const state = authReducer(initialState, loginSuccess({ user }));
    expect(state.user).toEqual(user);
    expect(state.error).toBeNull();
  });

  it('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const state = authReducer(initialState, loginError({ error }));
    expect(state.error).toBe(error);
  });

  it('should handle logoutSuccess', () => {
    const loggedInState: AuthState = { user: { username: 'admin', name: 'Admin', password: '1', id: '1', role: 'admin' }, error: null, loading: false };
    const state = authReducer(loggedInState, logoutSuccess());
    expect(state.user).toBeNull();
  });
});
