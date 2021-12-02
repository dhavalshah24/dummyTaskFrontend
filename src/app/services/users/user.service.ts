import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  signupURL = "http://localhost:4000/api/v1/users/signup";
  signup(data: any) {
    return this._http.post<any>(this.signupURL, data)
  }

  loginURL = "http://localhost:4000/api/v1/users/login";
  login(data: any) {
    return this._http.post<any>(this.loginURL, data)
  }

  forgotPasswordURL = "http://localhost:4000/api/v1/users/forgotPassword";
  forgotPassword(data: any) {
    return this._http.put<any>(this.forgotPasswordURL, data)
  }
}
