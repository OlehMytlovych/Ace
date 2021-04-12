import { mergeMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { loadingActionTypes } from './../actions/loading.actions';
import { State, selectLoading } from './../reducers/index';
import { OverlayService } from 'src/app/sharedServices/overlay-spinner/overlay/overlay.service';

@Injectable()
export class LoadingEffects {
  private loading: boolean;
  constructor(private actions$: Actions,
              private overlayService: OverlayService,
              private store: Store<State>) {
    this.store.pipe(select(selectLoading)).subscribe(loadingPayload => {
      this.loading = loadingPayload;
    });
  }

  public overlayOn = createEffect(() => this.actions$.pipe(
    ofType(loadingActionTypes.setLoadingTrue),
    tap(() => {
      if (this.loading) {
        this.overlayService.enable();
      }
    }),
  ), { dispatch: false });

  public overlayOff = createEffect(() => this.actions$.pipe(
    ofType(loadingActionTypes.setLoadingFalse),
    tap(() => {
      if (!this.loading) {
        this.overlayService.disable();
      }
    }),
  ), { dispatch: false });
}
