import { mergeMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';

import { State, selectUserAuthUserData } from './../reducers/index';
import { AuthService } from './../../auth/auth.service';
import { UserAuthActionTypes } from './../actions/user-auth.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserAuthEffects {
  private userSignUpData: any;

  public signUp = createEffect(() => this.actions$.pipe(
    ofType(UserAuthActionTypes.SignUpUser),
    mergeMap(() => this.authService.signUp(this.userSignUpData.email, this.userSignUpData.password)
    .pipe(
      map((response) => {
        console.log(response);
        return { type: UserAuthActionTypes.SignUpUserSuccess, data: response };
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of({ type: UserAuthActionTypes.SignUpUserFailure, error: err.error.message });
      }),
    )),
  ));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private store: Store<State>) {
    this.store.pipe(select(selectUserAuthUserData)).subscribe(userSignUpData => this.userSignUpData = userSignUpData);
  }
}
