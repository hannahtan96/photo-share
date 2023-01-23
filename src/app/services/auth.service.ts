import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;
  constructor() { }

  loggedInUser(){}

  isLoggedIn() {
    if (localStorage.getItem('token') === 'secretToken') {
      console.log('setting loggedIn as true')
      this.loggedIn = true;
    }
    return this.loggedIn
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
