import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'corp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'photo-share-app';

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  get isUser() {
    let is_user = localStorage.getItem('is_user');
    if (is_user === 'true') {
      return true
    } else {
      return false
    }
  }

}
