import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateUserService } from './authenticate-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticateUserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();

    console.log('Interceptor gets token as : ', authToken);

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'HPHPHP ' + authToken)
    });
    return next.handle(authReq);
  }
}
