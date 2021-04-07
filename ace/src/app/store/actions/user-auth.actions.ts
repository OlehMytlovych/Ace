import { createAction, props } from '@ngrx/store';

export enum UserAuthActionTypes {
  SignUpUser = '[UserAuth] SignUp User',
  SignUpUserSuccess = '[UserAuth] SignUp User Success',
  SignUpUserFailure = '[UserAuth] SignUp User Failure',
  SignInUser = '[UserAuth] SignIn User',
  SignInUserSuccess = '[UserAuth] SignIn User Success',
  SignInUserFailure = '[UserAuth] SignIn User Failure',
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

export const SignInUser = createAction(
  UserAuthActionTypes.SignInUser,
  props< {data: any} >(),
);

export const SignInUserSuccess = createAction(
  UserAuthActionTypes.SignInUserSuccess,
  props< {data: any} >(),
);

export const SignInUserFailure = createAction(
  UserAuthActionTypes.SignInUserFailure,
  props< {error: any} >(),
);
