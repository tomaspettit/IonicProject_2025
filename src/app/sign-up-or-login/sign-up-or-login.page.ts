import { Component} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
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
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon],
})
export class SignUpOrLoginPage{
  
  constructor(private router: Router) {
    //Add the icons to the page
    addIcons({logoFacebook, logoInstagram, logoGithub, personOutline, logInOutline});
  }

  //Browser plugin to open the social media links
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

