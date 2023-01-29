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

// https://stackblitz.com/edit/angular-authguard-jwt-duxyen?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Flogin%2Flogin.component.ts
