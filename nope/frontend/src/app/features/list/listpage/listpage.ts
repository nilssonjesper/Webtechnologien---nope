import { formatDate } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { DataHandler } from 'src/app/services/data-handler';
import { EventHandler } from 'src/app/services/event-handler';
import { AuthService } from 'src/app/services/auth.service';
import { LoginHandler } from 'src/app/services/login-handler';
import { Modal } from 'src/app/services/modal';

@Component({
  selector: 'app-listpage',
  standalone: false,
  templateUrl: './listpage.html',
  styleUrl: './listpage.scss',
})
export class Listpage {
  
  unconfirmedEvents: any;
  confirmedEvents: any;
  cancelledEvents: any;

//Jetzt keine feste UserId mehr!!
  currentUserId: string | null = null;

  constructor(
    public dataHandler: DataHandler,
    public eventHandler: EventHandler,
    public cdr: ChangeDetectorRef,
    private authService: AuthService,
    public loginHandler: LoginHandler,
    public modal: Modal
  )
  {
    //Jetzt leer da das jetztin ngOnInit
    //this.getConfirmedEvents();
    //this.getCancelledEvents();
    //this.getUnconfirmedEvents();

  }

  //wird immer beim Starten der Seite ausgeführt
  ngOnInit() {
      //UserId wird vom AuthService geholt
      this.currentUserId = this.authService.getCurrentUserId();

      if (this.currentUserId) {
          this.getConfirmedEvents();
          this.getCancelledEvents();
          this.getUnconfirmedEvents();
      } else {
          console.log("Nicht eingeloggt!");
      }
      
      this.loginHandler.loggedOut$.subscribe(bool =>{
        if(bool == true){
          this.unconfirmedEvents = [];
          this.cancelledEvents = [];
          this.confirmedEvents = [];
        }
      });
      this.modal.groupSelected$.subscribe(bool =>{
        if(bool == true){
            this.currentUserId = this.authService.getCurrentUserId();

          if (this.currentUserId) {
              this.getConfirmedEvents();
              this.getCancelledEvents();
              this.getUnconfirmedEvents();
          } else {
              console.log("Nicht eingeloggt!");
          }
        }
      });
  }

  //jetzt mit currentUserId
  getUnconfirmedEvents(){
    
    if(!this.currentUserId) return;
    this.dataHandler.getUnrespondedEvents().subscribe({
        next: events => {
          this.unconfirmedEvents = events;
          this.cdr.markForCheck();
      }, 
      error: err => console.error("Error:", err)
    });
  }

  //jetzt mit currentUserId
  getConfirmedEvents(){

    if(!this.currentUserId) return;
    this.dataHandler.getConfirmedEvents().subscribe({
        next: events => {
          this.confirmedEvents = events;
          this.cdr.markForCheck();
      }, 
      error: err => console.error("Error:", err)
    });
  }

  //jetzt mit currentUserId
  getCancelledEvents(){
    
    if(!this.currentUserId) return;
    this.dataHandler.getDisconfirmedEvents().subscribe({
        next: events => {
          this.cancelledEvents = events;
          this.cdr.markForCheck();
      }, 
      error: err => console.error("Error:", err)
    });
  }

  localeDate(date: string){
    let res = new Date(date);
    return res.toLocaleString();
  }

  //jetzt mit currentUserId
  confirmEvent(eventId : number){
    
    if(!this.currentUserId) return;
    this.eventHandler.confirmEvent(this.currentUserId, eventId).subscribe(() => {
        //Liste wird nach Aktion neu geladen
        this.getConfirmedEvents();
        this.getUnconfirmedEvents();
    });
  }

  //jetzt mit currentUserId
  rejectEvent(eventId : number){
    
    if(!this.currentUserId) return;
    this.eventHandler.rejectEvent(this.currentUserId, eventId).subscribe(() => {
        //Liste wird nach Aktion neu geladen
        this.getCancelledEvents();
        this.getUnconfirmedEvents();
    });
  }

}
