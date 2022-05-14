import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
//Este servicio interceptara el token y le hara cumplir el estandar de "Bearer [token]"
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authservice : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Agrego info a la cabecera del req
    const tokenizeReq = 
      req.clone({
        setHeaders :{
          Authorization: `Bearer ${this.authservice.getToken()}`
        }
      })
    return next.handle(tokenizeReq);
  }
}
