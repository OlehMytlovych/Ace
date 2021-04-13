import { ErrorDialogService } from './../../sharedServices/error-dialog/error-dialog.service';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import * as LoadingActions from '../actions/loading.actions';
import { SignInResponse } from './../../interfaces/signInResponse';
import { SignUpResponse } from './../../interfaces/signUpResponse';
import { State, selectUserAuthUpData, selectUserAuthInData } from './../reducers/index';
import { AuthService } from './../../auth/auth.service';
import { UserAuthActionTypes } from './../actions/user-auth.actions';

@Injectable()
export class UserAuthEffects {
  private userSignUpData: any;
  private userSignInData: any;
  constructor(private actions$: Actions,
              private authService: AuthService,
              private store: Store<State>,
              private errorDialogService: ErrorDialogService) {
    this.store.pipe(select(selectUserAuthUpData)).subscribe(userSignUpDataPayload => {
      this.userSignUpData = userSignUpDataPayload;
    });
    this.store.pipe(select(selectUserAuthInData)).subscribe(userSignInDataPayload => {
      this.userSignInData = userSignInDataPayload;
    });
  }

  public signUp = createEffect(() => this.actions$.pipe(
    ofType(UserAuthActionTypes.SignUpUser),
    mergeMap(() => {
      this.store.dispatch(LoadingActions.setLoadingTrue());
      console.log(this.userSignUpData)
      return this.authService.signUp(this.userSignUpData.email, this.userSignUpData.password)
        .pipe(
          map((response: SignUpResponse) => {
            this.store.dispatch(LoadingActions.setLoadingFalse());
            return { type: UserAuthActionTypes.SignUpUserSuccess, data: response };
          }),
          catchError((err: HttpErrorResponse) => {
            this.store.dispatch(LoadingActions.setLoadingFalse());
            this.errorDialogService.setNewError(err.error.error.message);
            return of({ type: UserAuthActionTypes.SignUpUserFailure, error: err.error.error.message });
          }),
    ); },
    ),
  ));

  public signIn = createEffect(() => this.actions$.pipe(
    ofType(UserAuthActionTypes.SignInUser),
    mergeMap(() => {
      this.store.dispatch(LoadingActions.setLoadingTrue());
      return this.authService.signIn(this.userSignInData.email, this.userSignInData.password)
        .pipe(
          map((response: SignInResponse) => {
            this.store.dispatch(LoadingActions.setLoadingFalse());
            return { type: UserAuthActionTypes.SignInUserSuccess, data: response };
          }),
          catchError((err: HttpErrorResponse) => {
            this.store.dispatch(LoadingActions.setLoadingFalse());
            this.errorDialogService.setNewError(err.error.error.message);
            return of({ type: UserAuthActionTypes.SignInUserFailure, error: err.error.error.message });
          }),
        );
    }),
  ));
}
