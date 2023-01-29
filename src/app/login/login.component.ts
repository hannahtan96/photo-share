import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'corp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: User = { username: '', password: ''};
  allowedPassword = 'bub';

  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit() {
    let user = localStorage.getItem('is_user');
    console.log(user)
    if (user) {
      this.router.navigate(['/slides'])
    }
  }

  loginUser() {
    if (this.loginUserData.password == this.allowedPassword) {
      console.log(this.loginUserData.password)
      localStorage.setItem('token', 'secretToken');
      localStorage.setItem('is_user', 'true')
      this.router.navigate(['/slides'])
    }
  }
}

export interface User {
  username: string;
  password: string;
}