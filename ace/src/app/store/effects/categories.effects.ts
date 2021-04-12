import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { CategoryService } from '../../sharedServices/category/category.service';
import { CategoriesActionTypes } from '../actions/categories.actions';
import  * as LoadingActions from './../actions/loading.actions';
@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions,
              private categoryService: CategoryService,
              private store: Store) {}

  public loadCategories = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActionTypes.LoadCategories),
    mergeMap(() => {
      this.store.dispatch(LoadingActions.setLoadingTrue());
      return this.categoryService.getAll()
      .pipe(
        map(categories => {
          this.store.dispatch(LoadingActions.setLoadingFalse());
          return { type: CategoriesActionTypes.LoadCategoriesSuccess , data: categories };
        }),
        catchError(err => {
          this.store.dispatch(LoadingActions.setLoadingFalse());
          return of({ type: CategoriesActionTypes.LoadCategoriesFailure, error: err });
        }),
      );
    }),
  ));
}
