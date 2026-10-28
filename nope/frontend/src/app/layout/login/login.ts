import { Component, ChangeDetectorRef } from '@angular/core';
import { LoginHandler } from 'src/app/services/login-handler';
import { AuthService } from 'src/app/services/auth.service';
import { Modal } from 'src/app/services/modal';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  //switch between login and register

  currentMode: 'login' | 'register' = 'login';

  userData = { name: '', email: '', password: '' };

  constructor (
    public login : LoginHandler,
    private authService : AuthService,
    public modal: Modal,
    private cdr: ChangeDetectorRef
    ) {};

  setMode(mode: 'login' | 'register') {
    this.currentMode = mode;
  }

  //Methode für login/registrierun
  confirm() {
    if (this.currentMode === 'login') {
      this.authService.login({ email: this.userData.email, password: this.userData.password}).subscribe({
        next: (res) => {
          console.log('login erfolgreich', res);
          this.login.loginClose();
          this.modal.loadGroups();
          this.cdr.detectChanges();
        },
        error: (err) => alert('login fehlgeschlagen ' + err.error.message)
      });
    } else {
      this.authService.register(this.userData).subscribe({
        next: (res) => {
          console.log('Registrierung erfolgreich', res);
          this.login.loginClose();
        },
        error: (err) => console.log('Registrierung fehlgeschlagen ' + err.error.message)
      });
     }
  }
}
