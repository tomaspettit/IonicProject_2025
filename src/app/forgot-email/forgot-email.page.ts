import { Component} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonCard, IonIcon,
  IonCardTitle, IonCardContent, IonCardHeader
 } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.page.html',
  styleUrls: ['./forgot-email.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonInput, IonButton, IonCard, IonIcon, IonCardTitle, IonCardContent, IonCardHeader]
})
export class ForgotEmailPage{

  // Variables
  forgotEmailDisabled: boolean = true;

  inputPPSN: string = '';
  inputDOB: string = '';
  inputNewEmail: string = '';

  myPPSN: string = '';
  myDOB: string = '';
  myNewEmail: string = '';

  constructor(private router: Router, private storage: Storage) { 
    // Add icons to the app
    addIcons({arrowBackOutline, personOutline});  
  }

  // Get the PPSN and DOB from the storage
  async ionViewWillEnter() {
    await this.storage.create();
    this.myPPSN = await this.storage.get('ppsn');
    this.myDOB = await this.storage.get('dob');
    this.myNewEmail = await this.storage.get('email');
  }

  // Check if the input fields have changed
  checkInputChanged() {
    if (this.inputPPSN != '' && this.inputDOB != '' && this.inputNewEmail != '') {
      this.forgotEmailDisabled = false;
    } else {
      this.forgotEmailDisabled = true;
    }
  }

  // Check if the input fields are valid
  async forgotEmail() {
    if(this.inputPPSN != this.myPPSN || this.inputDOB != this.myDOB){
      alert('Invalid PPSN or Date of Birth. Please try again.');
    }else if(this.inputNewEmail == this.myNewEmail){
      alert('Same Email. Try a different Email');
    }else{
      await this.storage.set('email', this.inputNewEmail);

    this.router.navigate(['/login']).then(() => { 
      this.clearInputs();
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
  }

  // Clear the input fields
  clearInputs() {
    this.inputPPSN = '';
    this.inputDOB = '';
    this.inputNewEmail = '';
  }

}
