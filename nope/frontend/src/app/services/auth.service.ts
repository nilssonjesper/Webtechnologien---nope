import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseURL = "http://localhost:3000/api/auth";
  
  //hier merken wir uns die ID des Users
  currentUserId: string | null = null;

  constructor(private http: HttpClient) {
      //nur beim Neuladen der Seite: prüfen ob eine ID im Speicher liegt
      this.currentUserId = localStorage.getItem("user_id");
  }

  // --- Login Methode ---
  login(credentials: {email: string, password: string}) {
    return this.http.post<any>(`${this.baseURL}/login`, credentials).pipe(
      tap(response => this.saveSession(response))
    );
  }

  // --- Register Methode ---
  register(user: any) {
    return this.http.post<any>(`${this.baseURL}/register`, user).pipe(
      tap(response => this.saveSession(response))
    );
  }

  // Hilfsmethode für Register und Login
  //speichert aktuelles Token + UserId
  private saveSession(response: any) {

    const token = response.token || (response.user && response.user.token);

    // 1. Token speichern
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      console.error("Kein Token in der Antwort gefunden!", response);
    }
    
    // 2. UserId speichern
    let userId = null;
    
    if (response.user && response.user._id) {
        userId = response.user._id;
    } else if (response.user && response.user.user && response.user.user._id) {
        userId = response.user.user._id;
    }

    if (userId) {
        this.currentUserId = userId;
        localStorage.setItem("user_id", userId); 
    }

  }

  // Methode um die UserId vom aktuell eingeloggten User zu bekommen (für Listpage)
  getCurrentUserId(): string | null {
      return this.currentUserId;
  }

  logout(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    
  }
}