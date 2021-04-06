import { createAction, props } from '@ngrx/store';

export enum UserAuthActionTypes {
  SignUpUser = '[UserAuth] SignUp User',
  SignUpUserSuccess = '[UserAuth] SignUp User Success',
  SignUpUserFailure = '[UserAuth] SignUp User Failure',
}

export const SignUpUser = createAction(
  UserAuthActionTypes.SignUpUser,
  props< {data: any} >(),
);

export const SignUpUserSuccess = createAction(
  UserAuthActionTypes.SignUpUserSuccess,
  props< {data: any} >(),
);

export const SignUpUserFailure = createAction(
  UserAuthActionTypes.SignUpUserFailure,
  props< {error: any} >(),
);
