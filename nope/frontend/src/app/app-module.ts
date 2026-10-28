import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navigation } from './layout/navigation/navigation';
import { Calendarheader } from './features/calendar/calendarheader/calendarheader';
import { TimeGrid } from './features/calendar/time-grid/time-grid';
import { Calendarpage } from './features/calendar/calendarpage/calendarpage';
import { Listpage } from './features/list/listpage/listpage';
import { Gridlines } from './features/calendar/gridlines/gridlines';
import { TimeLabels } from './features/calendar/time-labels/time-labels';
import { Header } from './layout/header/header';
import { GroupList } from './features/groups/group-list/group-list';
import { AddGroup } from './features/groups/add-group/add-group';
import { AddEvent } from './features/calendar/add-event/add-event';
import { AddEventOnDrag } from './features/calendar/add-event-on-drag/add-event-on-drag';
import { EventInfo } from './features/calendar/event-info/event-info';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { Profile } from './features/profile/profile';
import { Login } from './layout/login/login';


@NgModule({
  declarations: [
    App,
    Navigation,
    Calendarheader,
    TimeGrid,
    Calendarpage,
    Listpage,
    Gridlines,
    TimeLabels,
    Header,
    GroupList,
    AddGroup,
    AddEvent,
    AddEventOnDrag,
    EventInfo,
    Profile,
    Login,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
