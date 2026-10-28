import { Component } from '@angular/core';
import { DataHandler } from 'src/app/services/data-handler';
import { EventHandler } from 'src/app/services/event-handler';

@Component({
  selector: 'app-calendarheader',
  standalone: false,
  templateUrl: './calendarheader.html',
  styleUrl: './calendarheader.scss',
})
export class Calendarheader {
 // private date: Date = new Date();
  //currentlyShownDate = this.date.toLocaleDateString('de-DE');

  constructor(public dataHandler: DataHandler, public eventHeader: EventHandler){
   
  }

  
  prevDay(){
    this.dataHandler.prevDay();
  }

  nextDay(){
    this.dataHandler.nextDay();
  }

  today(){
    this.dataHandler.today();
  }
  

}
