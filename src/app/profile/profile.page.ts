//IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, 
  IonCardContent, IonButton, IonIcon
 } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, arrowBackOutline, logOutOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardContent, IonButton, IonIcon
  ]
})
export class ProfilePage{
  // Variables to store user details
  yourName: string = '';
  yourEmail: string = '';
  yourDob: string = '';
  yourPPSN: string = '';
  yourPhoneNo: string = '';
  yourAddress: string = '';
  yourEircode: string = '';
  yourCategory: string = '';
  yourDriverNo: string = '';

  constructor(private router: Router, private storage: Storage) { 
    // Add icons to the app
    addIcons({logoInstagram, logoFacebook, logoGithub, arrowBackOutline, logOutOutline});
  }

  // Create the storage instance
  async ngOnInit(): Promise<void> {
    await this.storage.create();
  }

  // Get the user's details from the storage when the page is loaded
  async ionViewWillEnter() {
    this.yourName = await this.storage.get("name");
    this.yourEmail = await this.storage.get("email");
    this.yourDob = await this.storage.get("dob");
    this.yourPPSN = await this.storage.get("ppsn");
    this.yourPhoneNo = await this.storage.get("phoneNo");
    this.yourAddress = await this.storage.get("address");
    this.yourEircode = await this.storage.get("eircode");
    this.yourCategory = await this.storage.get("category");
    this.yourDriverNo = await this.storage.get("driverNo");
  }

  // Browser plugin to open social media links
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
