import { Component, OnInit } from '@angular/core';
import { Modal } from '../../../services/modal'

@Component({
  selector: 'app-group-list',
  standalone: false,
  templateUrl: './group-list.html',
  styleUrl: './group-list.scss',
})
/*export class GroupList {

  constructor(public modal: Modal) {};

  onSelect(group: any) {
    this.modal.selectGroup(group);
  }
}*/

export class GroupList implements OnInit { // <--- implements OnInit hinzufügen

  constructor(public modal: Modal) {};

  //lädt gruppen im Drop Down
  ngOnInit() {
    this.modal.loadGroups(); 
  }

  onSelect(group: any) {
    this.modal.selectGroup(group);
  }
}
