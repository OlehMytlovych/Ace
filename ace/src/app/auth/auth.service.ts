import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SignInResponse } from './../interfaces/signInResponse';
import { SignUpResponse } from './../interfaces/signUpResponse';
import { signUpUrl, signInUrl } from './../dataUrls';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdmin = false;
  public isCustomer = false;
  public isProfessional = false;

  constructor(private http: HttpClient) { }

  public signUp(email: string, password: string) {
    return this.http.post<SignUpResponse>(signUpUrl,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );
  }

  public signIn(email: string, password: string) {
    return this.http.post<SignInResponse>(signInUrl,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );
  }
}
