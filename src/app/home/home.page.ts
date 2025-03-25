import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, personOutline, logOutOutline, bookOutline} from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [RouterLinkWithHref, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon]
})
export class HomePage implements OnInit{
  // Variables to store the user's details
  yourName: string = '';
  yourEmail: string = '';
  yourDob: string = '';
  yourPPSN: string = '';
  yourPhoneNo: string = '';
  yourAddress: string = '';
  yourEircode: string = '';
  yourCategory: string = '';

  fault:any[]=[];
  hint:any[]=[];

  constructor(private router: Router, private storage: Storage, private http: HttpService) {
    // Add the icons to the ion-icon
    addIcons({logoInstagram, logoFacebook, logoGithub, personOutline, logOutOutline, bookOutline});
  }

  async ionViewWillEnter() {
    // Load the user's details from the storage
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

  // Browser functions to open the social media links
  onInstagram(){
      Browser.open({ url: 'https://www.instagram.com/' });
    }
  
    onFacebook(){
      Browser.open({ url: 'https://www.facebook.com/login.php/' });
    }
  
    onGitHub(){
      Browser.open({ url: 'https://github.com/login/' });
    }

  ngOnInit(): void {
    this.http.GetFaultsAndHintsData().subscribe(
      (data)=>{
        this.fault=data.record.faults;
        this.hint=data.record.hints;
      }
    );
  }  
}
