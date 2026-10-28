import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Calendarpage } from './features/calendar/calendarpage/calendarpage';
import { Listpage } from './features/list/listpage/listpage';

const routes: Routes = [
  //navigation between calendar & list views
  {path: 'calendar', component: Calendarpage}, 
  {path: 'list', component: Listpage},
  {path: '', redirectTo: 'calendar', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
