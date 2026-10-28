import { Component } from '@angular/core';
import { Modal } from '../../../services/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-group',
  standalone: false,
  templateUrl: './add-group.html',
  styleUrl: './add-group.scss',
})
export class AddGroup {
[x: string]: any;

currentView: 'add' | 'create' = 'add';

newGroup = {
  name: '',
  description: '',
  isPublic: true, // Standardmäßig öffentlich
  pwd: ''
};

groupID: string = '';

constructor(public modal: Modal, public auth: AuthService) {}

switchView(view: 'add' | 'create') {
  this.currentView = view;
}

onCreate() {
  let userid = this.auth.getCurrentUserId();
  const dataToSend = {
    name: this.newGroup.name,
    description: this.newGroup.description,
    type: this.newGroup.isPublic, 
    pwd: this.newGroup.isPublic ? null : this.newGroup.pwd,
    users: [userid],
    events: []
  };

  this.modal.createGroup(dataToSend);
}

onJoin() {
  if(this.groupID.trim()) {
    this.modal.joinGroup(this.groupID);
  } else {
    alert('Bitte Gruppen-ID eingeben');
  }
}
}
