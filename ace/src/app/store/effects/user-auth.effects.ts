import { OverlayService } from './../../sharedServices/overlay-spinner/overlay/overlay.service';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
              private overlayService: OverlayService) {
    this.store.pipe(select(selectUserAuthUpData)).subscribe(userSignUpDataPayload => {
      this.userSignUpData = userSignUpDataPayload?.data;
    });
    this.store.pipe(select(selectUserAuthInData)).subscribe(userSignInDataPayload => {
      this.userSignInData = userSignInDataPayload?.data;
    });
  }

  public signUp = createEffect(() => this.actions$.pipe(
    ofType(UserAuthActionTypes.SignUpUser),
    mergeMap(() => {
      this.overlayService.enable();
      return this.authService.signUp(this.userSignUpData.email, this.userSignUpData.password)
        .pipe(
          map((response: SignUpResponse) => {
            this.overlayService.disable();
            return { type: UserAuthActionTypes.SignUpUserSuccess, data: response };
          }),
          catchError((err: HttpErrorResponse) => {
            this.overlayService.disable();
            return of({ type: UserAuthActionTypes.SignUpUserFailure, error: err.error.message });
          }),
    ); },
    ),
  ));

  public signIn = createEffect(() => this.actions$.pipe(
    ofType(UserAuthActionTypes.SignInUser),
    mergeMap(() => {
      this.overlayService.enable();
      return this.authService.signIn(this.userSignInData.email, this.userSignInData.password)
        .pipe(
          map((response: SignInResponse) => {
            this.overlayService.disable();
            return { type: UserAuthActionTypes.SignInUserSuccess, data: response };
          }),
          catchError((err: HttpErrorResponse) => {
            this.overlayService.disable();
            return of({ type: UserAuthActionTypes.SignInUserFailure, error: err.error.message });
          }),
        ); },
    ),
  ));

}
