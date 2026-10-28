import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Modal {

  private baseURL = "http://localhost:3000/api/user";

  //logik für das Fenster um Gruppen hinzuzufügen 
  private isOpen = false;
  private _groupSelected = new BehaviorSubject<boolean>(false);
          groupSelected$ = this._groupSelected.asObservable();
  

  constructor(private http: HttpClient, public auth: AuthService) {

  };
  
  open() { this.isOpen = true; }
  close() {this.isOpen = false; }
  getIsVisible() {return this.isOpen; }

  //logik für drop-down Menue der Gruppen
  //Hier später gruppen vom Backend holen 
  private groups: any[] = [];
  private selectedGroup: any = null;

  isDropdownOpen = false;

  
  loadGroups() {
    this.http.get<any[]>(`${this.baseURL}/allGroups`).subscribe({
      next: (data) => {
        this.groups = data; // Das Array mit den Gruppen vom Backend füllen
        
        // Falls noch keine Gruppe ausgewählt ist, nimm die erste aus der Liste
        if (!this.selectedGroup && data.length > 0) {
          this.selectedGroup = data[0];
          // to automatically update view
          this._groupSelected.next(true);
            setTimeout(() => {this._groupSelected.next(false)}, 10000);
        }
        console.log('Gruppen erfolgreich geladen:', this.groups);
      },
      error: (err) => {
        console.error('Fehler beim Laden der Gruppen:', err);
      }
    });
  }

  getDropdownState() {
    return this.isDropdownOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  getGroups() { return this.groups};
  //Lädt die Aktuell vom User ausgewählte gruppe
  getSelectedGroup() { 
   return this.selectedGroup;
  }

  loadSelectedGroup() {
    this.http.get<any>(`${this.baseURL}/selected-group`).subscribe({
      next: (group) => {
        if (group) {
          this.selectedGroup = group;
          console.log('Aktuelle Gruppe geladen: ', group.name);
        } else {
          this.selectedGroup = { name: 'Gruppe wählen'};
        }
        
      },
      error: (err) => console.error('Fehler beim Laden der Gruppe:', err)
    });
  }

  selectGroup(group: any) {
    /*if(!group?._id){
      console.error("modal: group is not valid");
      return;
    }*/
    let userid = this.auth.getCurrentUserId();

    this.http.put<any>(`${this.baseURL}/selected-group`, { userID: userid, groupId: group._id }).subscribe({

      next: (res) => {

        setTimeout(() => {
          this.selectedGroup = group;
          this.closeDropdown();
          this._groupSelected.next(true);
        }, 0);
        
        setTimeout(() => {this._groupSelected.next(false)}, 10000);

        console.log(res.message);
      },

      error: (err) => {
        alert(err.error.error);
      }
  });
  }

  createGroup(newGroupData: any) {
    let userid = this.auth.getCurrentUserId();
    return this.http.post<any>(`http://localhost:3000/api/group/create`, newGroupData).subscribe({
    next: (group) => {
      /*if(!group?.id){
        console.error("modal: group is not valid")
        return
      }*/
      this.groups.push(group);
      this.selectGroup(group);
      this.close();
    },
    error: (err) => console.log('Fehler beim Erstellen: ', err)
  });
  }

  joinGroup(groupId: string) {
    this.http.put<any>(`${this.baseURL}/add-group`, { groupId}).subscribe({
      next: (res) => {
        console.log('Erfolgreich beigetreten');
        this.loadGroups();
        this.close();
      },
      error: (err) => {
        console.log("Fehler beim Beitritt: " + err.error.error);
      }
    });
  }

  setSelectedGroup(selectedGroup: any){
    this.selectedGroup = selectedGroup;
  }

}
