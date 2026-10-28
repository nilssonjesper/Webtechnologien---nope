import { Component } from '@angular/core';
import { EventHandler } from 'src/app/services/event-handler';
import { DataHandler } from 'src/app/services/data-handler';
import { Modal } from 'src/app/services/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-event-on-drag',
  standalone: false,
  templateUrl: './add-event-on-drag.html',
  styleUrl: './add-event-on-drag.scss',
})
export class AddEventOnDrag {
  eventName = '';
    startDate = new Date();
    endDate = new Date();
    description = '';
    constructor(public eventHandler: EventHandler, public dataHandler: DataHandler, public modal: Modal, public auth : AuthService){
  
    }
    getEventInput(){
    this.startDate = new Date(this.eventHandler.startTimeOnDrag);
    this.endDate = new Date(this.eventHandler.endTimeOnDrag);
    if (this.startDate.getMinutes() == this.endDate.getMinutes() && this.startDate.getHours() == this.endDate.getHours() && this.startDate.getDate() == this.endDate.getDate()) {
      const endD = new Date().setHours(this.startDate.getHours()+ 1);
      this.endDate = new Date(endD);
    }
    else if (this.startDate.getTime() > this.endDate.getTime()){
        const helper = new Date(this.startDate);
        this.startDate = new Date(this.endDate);
        this.endDate = helper;
    }
    if(this.modal.getSelectedGroup() == undefined){
      this.eventHandler.closeAddEvent();
      return;
    }
    let groupId = this.modal.getSelectedGroup()._id;
    let userId = this.auth.getCurrentUserId();
    const newEvent = {name: this.eventName, startDate: this.startDate, endDate: this.endDate, description: this.description, group: groupId};
    
    return newEvent;
    }
}
