import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserAuthEffects } from './user-auth.effects';

describe('UserAuthEffects', () => {
  let actions$: Observable<any>;
  let effects: UserAuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAuthEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(UserAuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
