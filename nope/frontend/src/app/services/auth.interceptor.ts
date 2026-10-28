import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //Token aus Speicher holen
    const token = localStorage.getItem("auth_token");

    if (token) {
        
      //Wenn Token da: Request kopieren + Header adden
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(cloned);
    }

    //Wenn Token nicht da: weitermachen
    return next.handle(request);
  }
}