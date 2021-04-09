import { Professional } from './../../interfaces/professional';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  Action,
  on,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as UserAuthActions from '../actions/user-auth.actions';
import { SignUpResponse } from './../../interfaces/signUpResponse';

export interface State {
  signUpUserData: Professional | null | any;
  signUpResponce: SignUpResponse | null;
  signInUserData: Professional | null | any;
  signInResponce: SignUpResponse | null;
  error: string | null;
}

const initialState: State = {
  signUpUserData: null,
  signUpResponce: null,
  signInUserData: null,
  signInResponce: null,
  error: null,
};

const userAuthReducer = createReducer(
  initialState,
  on(UserAuthActions.SignUpUser, (state, action) => ({ ...state, signUpUserData: action.data, signUpResponce: null, error: null })),
  on(UserAuthActions.SignUpUserSuccess, (state, action) => ({ ...state, signUpUserData: null, signUpResponce: action.data, error: null })),
  on(UserAuthActions.SignUpUserFailure, (state, action) => ({ ...state, signUpUserData: null, signUpResponce: null, error: action.error })),
  on(UserAuthActions.SignInUser, (state, action) => {
    console.log(action)
    return { ...state, signInUserData: action, signInResponce: null, error: null }
  }/*  ({ ...state, signInUserData: action.data, signInResponce: null, error: null }) */),
  on(UserAuthActions.SignInUserSuccess, (state, action) => {
    console.log(action);
    return { ...state, signInUserData: null, signInResponce: action.data, error: null };
  }),
  on(UserAuthActions.SignInUserFailure, (state, action) => ({ ...state, signInUserData: null, signInResponce: null, error: action.error })),
);

export function reducer(state: State | undefined, action: Action) {
  return userAuthReducer(state, action);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
