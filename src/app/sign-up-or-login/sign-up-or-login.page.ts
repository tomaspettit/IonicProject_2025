import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, personOutline, logInOutline} from 'ionicons/icons';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-sign-up-or-login',
  templateUrl: './sign-up-or-login.page.html',
  styleUrls: ['./sign-up-or-login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon],
})
export class SignUpOrLoginPage implements OnInit{
  
  constructor(private router: Router) {
    addIcons({logoFacebook, logoInstagram, logoGithub, personOutline, logInOutline});
  }

  ngOnInit() {
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }

  onLogIn() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  onInstagram(){
    Browser.open({ url: 'https://www.instagram.com/' });
  }

  onFacebook(){
    Browser.open({ url: 'https://www.facebook.com/login.php/' });
  }

  onGitHub(){
    Browser.open({ url: 'https://github.com/login/' });
  }
}

