import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileHandler {
  
  private isDropownOpen_profile = false;

  getDropdownState_profile() {
    return this.isDropownOpen_profile;
  }

  toggleDropdown_profile() {
    this.isDropownOpen_profile = !this.isDropownOpen_profile;
  }

  closeDropdown_profile() {
    this.isDropownOpen_profile = false;
  }

}
