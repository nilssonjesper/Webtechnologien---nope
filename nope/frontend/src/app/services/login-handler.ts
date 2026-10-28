import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoginHandler {
  
  private loginIsOpen = true;

  private isLoggedIn = false;

  //for logout 
  private _loggedOut = new BehaviorSubject<boolean>(false);
        loggedOut$ = this._loggedOut.asObservable();



  loginOpen() { if(!this.isLoggedIn) {
    this.loginIsOpen = true;
  }
  };
  loginClose() {this.loginIsOpen = false;
  this.isLoggedIn = true;};
  
  loginIsVisible() {
    //this.loginOpen();
    return this.loginIsOpen;};

  setIsLoggedIn(bool : boolean){
    this.isLoggedIn = bool;
  }
  loggout(){
    this._loggedOut.next(true);
        setTimeout(() => {this._loggedOut.next(false)}, 10000);
  }
}
