import { Component } from '@angular/core';
import { Modal } from '../../services/modal';
import { ProfileHandler } from 'src/app/services/profile-handler';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(public modal: Modal, public profile: ProfileHandler) {}

  ngOnInit(): void {
    this.modal.loadSelectedGroup;
  }

  onAddGroupClick() {
    this.modal.open();
  }
}
