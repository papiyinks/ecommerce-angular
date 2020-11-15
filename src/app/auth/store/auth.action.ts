import { Action } from '@ngrx/store';


export const AUTH_TOKEN = 'AUTH_TOKEN';
export const AUTH_USERID = 'AUTH_USERID';
export const LOGOUT = 'LOGOUT';


export class AuthToken implements Action {
  readonly type = AUTH_TOKEN;
  constructor(public token: string){}
}

export class AuthUserId implements Action {
  readonly type = AUTH_TOKEN;
  constructor(public userId: string){}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions =
| AuthToken
| AuthUserId
| Logout;
