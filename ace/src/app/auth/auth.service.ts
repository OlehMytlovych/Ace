import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SignUpResponse } from './../interfaces/signUpResponse';
import { signUpUrl } from './../dataUrls';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdmin = false;
  public isCustomer = false;
  public isProfessional = false;

  constructor(private http: HttpClient) { }

  public signUp(email: string, password: string) {
    return this.http.post(signUpUrl,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );
  }
}
