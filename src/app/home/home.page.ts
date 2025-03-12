import { Component} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon} from '@ionic/angular/standalone';
import { IonMenu, IonMenuButton, IonButtons, IonMenuToggle} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, personOutline} from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonMenu, IonMenuButton, IonButtons,
    IonMenuToggle]
})
export class HomePage {
  yourName: string = '';
  yourEmail: string = '';
  yourDob: string = '';
  yourPPSN: string = '';
  yourPhoneNo: string = '';
  yourAddress: string = '';
  yourEircode: string = '';
  yourCategory: string = '';

  constructor(private router: Router, private storage: Storage) {
    addIcons({logoInstagram, logoFacebook, logoGithub, personOutline});
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.yourName = await this.storage.get("name") || '';
    this.yourEmail = await this.storage.get("email") || '';
    this.yourDob = await this.storage.get("dob") || '';
    this.yourPPSN = await this.storage.get("ppsn") || '';
    this.yourPhoneNo = await this.storage.get("phoneNo") || '';
    this.yourAddress = await this.storage.get("address") || '';
    this.yourEircode = await this.storage.get("eircode") || '';
    this.yourCategory = await this.storage.get("category") || '';
  }

  onProfile() {
    this.router.navigate(['/profile']);
  }

  clickResult() {
    this.router.navigate(['/rsa-result']);
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

  // Navigate to loading page
  logOut(){
    this.router.navigate(['/loading']); 
  }
}
