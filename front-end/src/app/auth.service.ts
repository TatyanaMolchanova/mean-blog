import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

export class RegisterResponse {
  public success: boolean;
  public msg: string;
}

export class AuthResponse {
  public success: boolean;
  public msg?: string;
  public token?: string;
  public user?: UserResponse
}

export class UserResponse {
  public id: string;
  public name: string;
  public login: string;
  public email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string
  user: UserResponse
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<RegisterResponse>('http://localhost:3000/account/reg', user,
      {headers: headers})
  }

  authUser(user) {
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post<AuthResponse>('http://localhost:3000/account/auth', user,
      {headers: headers})
  }

  storeUser(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    this.token = token
    this.user = user
  }

  logout() {
    this.token = null
    this.user = null
    localStorage.clear()
  }

  isAuthenticated() {
    return this.jwtHelper.isTokenExpired(this.token);
  }
}
