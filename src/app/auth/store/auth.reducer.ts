
import { AUTH_TOKEN, AUTH_USERID, LOGOUT } from './auth.action';

export interface State {
  token: string;
  userId: string;
}

const initialState: State = {
  token: '',
  userId: '',
};

export function authReducer(
  state = initialState,
  action: { type: string; token: string; userId: string }
): State {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        token: action.token,
        userId: state.userId,
      };
    case AUTH_USERID:
      return {
        token: state.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    }
  return state;
}
