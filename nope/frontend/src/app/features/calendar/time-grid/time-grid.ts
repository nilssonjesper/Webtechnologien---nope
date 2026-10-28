import { Component, ChangeDetectorRef } from '@angular/core';
import { DataHandler } from 'src/app/services/data-handler';
import { Modal } from '../../../services/modal';
import { EventHandler } from 'src/app/services/event-handler';
import { RouterUpgradeInitializer } from '@angular/router/upgrade';
import { AuthService } from 'src/app/services/auth.service';
import { LoginHandler } from 'src/app/services/login-handler';

@Component({
  selector: 'app-time-grid',
  standalone: false,
  templateUrl: './time-grid.html',
  styleUrl: './time-grid.scss',
})
export class TimeGrid {
  //to show and update current time
  intervalId = 0;
  private date: Date = new Date();
  private hours = this.date.getHours();
  private mins = this.date.getMinutes();
  position = 25;
  
  //to add Events by dragging
  isMouseClicked = false;
  mouseClickY!: number;
  isDragging = false;
  dragStartPosition: number = 0;
  dragCurrentPosition!: number;
  dragEndPosition!: number;
  dragStartTime!: Date;
  dragEndTime!: Date;
  heightPreview = 0;
  beginningPreview = 0;

  //access Events
  todaysEvents: any;
  eventDuration: any;


  constructor(private dataHandler: DataHandler, public cdr: ChangeDetectorRef, public modal: Modal, public eventHandler : EventHandler, public auth: AuthService, public loginHandler: LoginHandler){
    this.updateTime();
    this.loadTodaysEvents(this.dataHandler.getCurrentlyShownDate().value);

    //updates every minute 
    this.intervalId = setInterval(() => {
      this.updateTime();
      this.cdr.detectChanges();
    }, 60000); 
    
  }

  //updates events when Date is changed or new Event is added
  ngOnInit(){
    this.dataHandler.currentlyShownDate$.subscribe(date => {
      this.loadTodaysEvents(date);
      //this.cdr.detectChanges();
    });
    this.eventHandler.eventCreated$.subscribe(_ =>{
        this.loadTodaysEvents(this.dataHandler.getCurrentlyShownDate().value);
        //to close addEventBox after event was created
        this.eventHandler.closeAddEvent();
        this.eventHandler.closeAddEventOnDrag();
    });
    this.eventHandler.eventDeleted$.subscribe(_ =>{
        this.loadTodaysEvents(this.dataHandler.getCurrentlyShownDate().value);
        //to close addEventBox after event was created
        this.eventHandler.closeEventInfo();
    });
    this.loginHandler.loggedOut$.subscribe(bool =>{
      if(bool == true){
        this.todaysEvents = [];
      }
    })
    this.modal.groupSelected$.subscribe(bool =>{
      if(bool == true){
        this.loadTodaysEvents(this.dataHandler.getCurrentlyShownDate().value);
     }
    })
  }

  updateTime(){
    this.date = new Date();
    this.hours = this.date.getHours();
    this.mins = this.date.getMinutes();
    // 1 hour = 4 vh, margin = 2.5 vh
    this.position =  2.5 + 4* this.hours + 4 / 60 * this.mins;
  }

  //get Events for currentlyShownDate (uses function from datahandler to access backend-function)
  loadTodaysEvents(date: Date){
    if(this.modal.getSelectedGroup() == undefined){
      this.todaysEvents = [];
      return;
    }
    let userId = this.auth.getCurrentUserId();
    let groupId = this.modal.getSelectedGroup()._id;
    //console.log(groupId);
    //let groupId = '697dfae8612fc01e48347f17';
    this.dataHandler.getDailyEventsByGroup(groupId , userId,  date).subscribe({

        next: events => {
          this.todaysEvents = events;
          this.cdr.markForCheck();
      }, 
      error: err => console.error('Error:', err)
    });
    console.log(this.todaysEvents);
  } 


  //transforms Date String into local format
  localDate(date: string){
    let res = new Date(date);
    return res.toLocaleString();
  }
  //calculates Position in calendar from startTime
  calcPosition(start: string): number {
    this.date  = new Date(start);
    return 2.5 + 4* this.date.getHours() + 4 / 60 * new Date(start).getMinutes();
  }
  //calculates Height of event based on duration
  getHeight(start:any, end:any){
    let startDate = new Date(start);
    let endDate = new Date(end);
    let min = Math.floor((endDate.getTime() - startDate.getTime())/1000/60);
    return min * 4/60;
  }

  //functions to add Events on drag and drop

  //calculates time from position in calendar
  calcTime(pos: number){
    pos = pos -2.5;
    const hours = Math.floor((pos)/4);
    let minutes = (pos/4 - hours) *60;
    //always rounds to next quarterhour
    minutes = (Math.round(minutes/15))*15;
    const nDate = new Date(this.dataHandler.getCurrentlyShownDate().value);
    nDate.setHours(hours, minutes, 0, 0);
    return nDate;
  }
  startDrag(trigger: MouseEvent){
    
    this.isMouseClicked = true;
    this.mouseClickY = trigger.pageY;
    this.dragStartPosition = (trigger.pageY -110)/window.innerHeight * 100;
    this.dragStartTime = new Date(this.calcTime(this.dragStartPosition));
  }
  onDrag(trigger: MouseEvent){
    if(!this.isMouseClicked) return;
    if(!this.isDragging){
      //calculate drag height in vh
      const dragH = Math.abs(this.mouseClickY - trigger.pageY)/window.innerHeight * 100;
      //if drag motion smaller than 15min
      if( dragH < 1){
        //this.isMouseClicked = false;
        return;
      }
      this.isDragging = true;
    }
    
    this.dragCurrentPosition = (trigger.pageY-110)/window.innerHeight * 100;
    this.beginningPreview = Math.min(this.dragStartPosition, this.dragCurrentPosition);
    this.dragEndPosition = Math.max(this.dragStartPosition, this.dragCurrentPosition);
    this.heightPreview = this.dragEndPosition - this.beginningPreview;
  }
  endDrag(trigger: MouseEvent){
    if(this.isDragging){
      this.dragEndTime = new Date(this.calcTime(this.dragEndPosition));
      //no events under 15min
      if(this.heightPreview >= 1){
        this.eventHandler.openAddEventOnDrag(this.dragStartTime, this.dragEndTime);
      }
    }
    this.isMouseClicked = false;
    this.isDragging = false;
    
  }
}
