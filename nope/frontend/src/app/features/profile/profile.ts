import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginHandler } from 'src/app/services/login-handler';
import { Modal } from 'src/app/services/modal';
import { ProfileHandler } from 'src/app/services/profile-handler';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  constructor(public profile: ProfileHandler, public authservice : AuthService, public loginHandler: LoginHandler, public modal: Modal) {};

  logout(){
    this.authservice.logout();
    this.profile.closeDropdown_profile();
    this.loginHandler.setIsLoggedIn(false);
    this.modal.setSelectedGroup([]);
    this.loginHandler.loggout();
    this.loginHandler.loginOpen();

  }

}
