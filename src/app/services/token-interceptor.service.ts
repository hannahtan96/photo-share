import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInteceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      const token: string | null = localStorage.getItem('token');

      if (token) {
        req = req.clone({
          headers: req.headers.set('Authorization', token),
        });
        const headers = new HttpHeaders().set('Authorization', 'Bearer' + token);
        const AuthRequest = req.clone({ headers: headers });
        return next.handle(AuthRequest);
      } else {
        return next.handle(req)
      }
  }
}
