import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventHandler {
    //base URL for http requests
    private baseURL = 'http://localhost:3000'

    //logic for adding-event-window
    private isAddEventOpen = false;
    
    //private eventCreated: boolean = false;
    private _eventCreated = new BehaviorSubject<boolean>(false);
      eventCreated$ = this._eventCreated.asObservable();

    private _eventDeleted = new BehaviorSubject<boolean>(false);
      eventDeleted$ = this._eventDeleted.asObservable();

    //logic for adding-event-window after dragging (times already set)
    private isAddEventOnDragOpen = false;
    startTimeOnDrag!: Date;
    endTimeOnDrag!: Date;

    //logic for eventInfoBox
    private isEventInfoOpen = false;
    private currentEventInfo!: any;
    private _updatedEventInfo = new BehaviorSubject<boolean>(false);
      updatedEventInfo$ = this._updatedEventInfo.asObservable();

    constructor(private http: HttpClient){}

    //methods for addEvent
    openAddEvent() { this.isAddEventOpen = true; }
    closeAddEvent() {this.isAddEventOpen = false; }
    getIsAddEventOpen(){
      return this.isAddEventOpen;
    }
    //methods for addEventOnDrag
    openAddEventOnDrag(startTime: Date, endTime: Date){ 
      this.isAddEventOnDragOpen = true;
      this.startTimeOnDrag = startTime;
      this.endTimeOnDrag = endTime;
    }
    closeAddEventOnDrag(){ this.isAddEventOnDragOpen = false;}
    getIsAddEventOnDragOpen(){
      return this.isAddEventOnDragOpen;
    }

    //methods for eventInfoBox
    openEventInfo(event: any){
      this._updatedEventInfo.next(true);
        setTimeout(() => {this._updatedEventInfo.next(false)}, 10000);
      this.currentEventInfo = event;
      this.isEventInfoOpen = true;
    }
    closeEventInfo(){
      this.isEventInfoOpen = false;
    }
    getIsEventInfoOpen(){
      return this.isEventInfoOpen;
    }
    getCurrentEvent(){
      return this.currentEventInfo;
    }

    //add event to db
    addEvent(event: any){
        this.http.post(`${this.baseURL}/api/event/addEvent`, event).subscribe();
        this._eventCreated.next(true);
        setTimeout(() => {this._eventCreated.next(false)}, 10000);
        //console.log(event);
    }
    
    deleteEvent(eventId : number){
      return this.http.delete(`${this.baseURL}/api/event/deleteEvent/${eventId}`).subscribe({
        next: () => {
          this._eventDeleted.next(true);
          setTimeout(() => {this._eventDeleted.next(false)}, 10000);
        }
      });
    }


    //getUsers with specific status for event
    getUnrespondedUsers(eventId: string){
      return this.http.get(`${this.baseURL}/api/event/unrespondedUsers?eventID=${eventId}`);
    }
  
    getConfirmedUsers(eventId: string){
      return this.http.get(`${this.baseURL}/api/event/confirmedUsers?eventID=${eventId}`);
    }
    getDisconfirmedUsers(eventId : string){
      return this.http.get(`${this.baseURL}/api/event/disconfirmedUsers?eventID=${eventId}`);
    }

    rejectEvent(userId: string, eventId : number){
      return this.http.patch(`${this.baseURL}/api/event/disconfirm`, {userId, eventId});
    }
    confirmEvent(userId: string, eventId : number){
      return this.http.patch(`${this.baseURL}/api/event/confirm`, {userId, eventId});
    }

}
