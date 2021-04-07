import { UserAuthActionTypes } from './../../../store/actions/user-auth.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { State } from '../../../store/reducers/index';
import { MustMatch } from '../../../helpers/mustMatch';
import * as UserAuthActions from '../../../store/actions/user-auth.actions';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  public generalForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder,
              private store: Store<State>) { }

  public ngOnInit(): void {
    this.generalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{11}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword'),
    });
  }

  public onSubmit() {
    if (this.generalForm.invalid) {
      this.submitted = false;
      return;
    }
    this.submitted = true;

    this.store.dispatch(UserAuthActions.SignUpUser({ data: this.generalForm.value }));

    // this.router.navigate(['home']);
  }
}
