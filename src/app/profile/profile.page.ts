import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardTitle, IonCardContent, IonButton
 } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ]
})
export class ProfilePage implements OnInit {
  yourName: string = '';
  yourEmail: string = '';
  yourDob: string = '';
  yourPPSN: string = '';
  yourPhoneNo: string = '';
  yourAddress: string = '';
  yourEircode: string = '';
  yourCategory: string = '';

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
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

  backButton(){ 
    this.router.navigate(['/home']);
  }

}
