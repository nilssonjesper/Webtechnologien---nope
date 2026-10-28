import { Component , ChangeDetectorRef} from '@angular/core';
import { EventHandler } from 'src/app/services/event-handler';


@Component({
  selector: 'app-event-info',
  standalone: false,
  templateUrl: './event-info.html',
  styleUrl: './event-info.scss',
})
export class EventInfo {
  constructor(public eventHandler: EventHandler, private cdr: ChangeDetectorRef){
  }
  discomfirmedUsers: any;
  confirmedUsers: any;
  unrespondedUsers: any;

  ngOnInit(){
    this.eventHandler.updatedEventInfo$.subscribe(_ =>{
      const curEventId = this.eventHandler.getCurrentEvent()._id;
          this.loadDisconfirmedUsers(curEventId);
          this.loadConfirmedUsers(curEventId);
          this.loadUnrespondedUsers(curEventId);
    });
  }
  
  loadDisconfirmedUsers(eventId : string){
    this.eventHandler.getDisconfirmedUsers(eventId).subscribe({
      next: users => {
          this.discomfirmedUsers = users;
          this.cdr.markForCheck();
      }, 
      error: err => console.error('Error:', err)
    });
  }
  loadConfirmedUsers(eventId : string){
    this.eventHandler.getConfirmedUsers(eventId).subscribe({
      next: users => {
          this.confirmedUsers = users;
          this.cdr.markForCheck();
      }, 
      error: err => console.error('Error:', err)
    });
  }
  loadUnrespondedUsers(eventId : string){
    this.eventHandler.getUnrespondedUsers(eventId).subscribe({
      next: users => {
          this.unrespondedUsers = users;
          this.cdr.markForCheck();
      }, 
      error: err => console.error('Error:', err)
    });
  }
}
