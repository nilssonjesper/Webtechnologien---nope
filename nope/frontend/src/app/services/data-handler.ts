import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//class to access data from backend 
export class DataHandler {
  //base URL wenn accessing backend
  private baseURL = 'http://localhost:3000'
  private _currentlyShownDate = new BehaviorSubject<Date>(new Date());
  currentlyShownDate$ = this._currentlyShownDate.asObservable();

  constructor(private http: HttpClient){
    this.updateDate(new Date());
  }

  updateDate(pdate: Date){
    this._currentlyShownDate.next(pdate);
  }
  getCurrentlyShownDate(){
    return this._currentlyShownDate;
  } 
  getCurrentlyShownDateAsString(){
    return this._currentlyShownDate.value.toLocaleDateString();
  }
  
  prevDay(){
    let newDate = new Date(this.getCurrentlyShownDate().value);
    newDate.setDate(newDate.getDate() - 1);
    this.updateDate(newDate);
  }
  nextDay(){
    let newDate = new Date(this.getCurrentlyShownDate().value);
    newDate.setDate(newDate.getDate() + 1);
    this.updateDate(newDate);
  }

  today(){
    let newDate = new Date();
    this.updateDate(newDate);
  }
  

  //functions from model groups.js
  getDailyEventsByGroup(groupId: any, userid : any , date: Date){
    return this.http.get(`${this.baseURL}/api/group/daily-events?groupName=${groupId}&userID=${userid}&date=${date}`);
  }

  //functions from model events.js
  getEventDuration(eventId: any){
    return this.http.get(`${this.baseURL}/api/event/eventduration?eventID=${eventId}`);
  }

  getConfirmedEvents(){
    return this.http.get(`${this.baseURL}/api/user/confirmedEvents`);
  }

  getDisconfirmedEvents(){
    return this.http.get(`${this.baseURL}/api/user/disconfirmedEvents`);
  }

  getUnrespondedEvents(){
    return this.http.get(`${this.baseURL}/api/user/unrespondedEvents`);
  }

}
