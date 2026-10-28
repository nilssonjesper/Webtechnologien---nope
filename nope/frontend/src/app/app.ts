import { Component, signal, OnInit } from '@angular/core';
import { Modal } from './services/modal';
import { LoginHandler } from './services/login-handler';
//import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('frontend');

  constructor(public modal: Modal, public login: LoginHandler) {}
}

//HARDGECODETER TEST FÜR AUTH
/*
export class App implements OnInit {

  protected readonly title = signal("frontend");

  constructor(public modal: Modal, private authService: AuthService) {}
  
  ngOnInit() {
    //den User muss es schon in der db geben
    const newUser = {
      name: "Lara3",
      email: "lara3.braukmann@test.de", 
      password: "geheim"
    };

    console.log("Starte Registrierung...");

    this.authService.register(newUser).subscribe({
      next: (res) => {
        console.log("Registrierung erfolgreich! Token erhalten:", res);
        console.log("Jetzt Seite neuladen (F5) damit die Liste die Daten lädt");
      },
      error: (err) => {
        console.error("Registrierung fehlgeschlagen:", err);
        // Falls der User schon existiert (Fehler 409), versuchen wir den Login:
        if (err.status === 409 || err.status === 500) {
           console.log("User existiert schon! Versuche Login...");
           this.authService.login({email: newUser.email, password: newUser.password}).subscribe({
             next: (loginRes) => console.log("Login erfolgreich!", loginRes),
             error: (loginErr) => console.error("Auch Login fehlgeschlagen:", loginErr)
           });
        }
      }
    });
  }

}
*/
