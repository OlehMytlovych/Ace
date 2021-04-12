import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadingEffects } from './loading.effects';

describe('LoadingEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(LoadingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
