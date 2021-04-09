import { OverlayService } from './../../sharedServices/overlay-spinner/overlay/overlay.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoryService } from '../../sharedServices/category/category.service';
import { CategoriesActionTypes } from '../actions/categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions,
              private categoryService: CategoryService,
              private overlayService: OverlayService) {}

  public loadCategories = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActionTypes.LoadCategories),
    mergeMap(() => {
      this.overlayService.enable();
      return this.categoryService.getAll()
      .pipe(
        map(categories => {
          this.overlayService.disable();
          return { type: CategoriesActionTypes.LoadCategoriesSuccess , data: categories };
        }),
        catchError(err => {
          this.overlayService.disable();
          return of({ type: CategoriesActionTypes.LoadCategoriesFailure, error: err });
        }),
      );
    }),
  ));
}
