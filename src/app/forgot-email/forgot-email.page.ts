// IMPORTS
import { Component, OnInit} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonCard, IonIcon,
  IonCardTitle, IonCardContent, IonCardHeader, ToastController
 } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.page.html',
  styleUrls: ['./forgot-email.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonInput, IonButton, IonCard, IonIcon, IonCardTitle, IonCardContent, IonCardHeader]
})
export class ForgotEmailPage implements OnInit{

  // Disabled Submit Button (Forgot Email)
  forgotEmailDisabled: boolean = true;

  // Variables
  inputPPSN: string = '';
  inputDOB: string = '';
  inputNewEmail: string = '';

  // Storage Variables
  myPPSN: string = '';
  myDOB: string = '';
  myNewEmail: string = '';

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add icons to the app
    addIcons({arrowBackOutline, personOutline, alertCircleOutline, checkmarkCircleOutline });  
  }

  // Create the storage instance
  async ngOnInit(): Promise<void> {
    await this.storage.create();
  }

  // Get the PPSN and DOB from the storage
  async ionViewWillEnter() {
    this.myPPSN = await this.storage.get('ppsn');
    this.myDOB = await this.storage.get('dob');
    this.myNewEmail = await this.storage.get('email');
    console.log("Forgot Email: " + this.myPPSN + " " + this.myDOB + " " + this.myNewEmail)
  }

  // Check if the input fields have changed
  checkInputChanged() {
    if (this.inputPPSN != '' && this.inputDOB != '' && this.inputNewEmail != '') {
      this.forgotEmailDisabled = false; // Sign Up Button NOT disable
    } else {
      this.forgotEmailDisabled = true; // Sign Up Button disable
    }
  }

  // Check if the input fields are valid
  async forgotEmail() {
    if(this.inputPPSN != this.myPPSN || this.inputDOB != this.myDOB){
      const toast = await this.toastController.create({
        message: 'Invalid PPSN or Date of Birth. Please try again.',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();
    
    // Check if both emails are the same
    }else if(this.inputNewEmail == this.myNewEmail){
      const toast = await this.toastController.create({
        message: 'Same Email. Try a different Email.',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();
    
    // Successful Email Change
    }else{
      await this.storage.set('email', this.inputNewEmail);

      const toast = await this.toastController.create({
        message: 'Your new Email has been complete.',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();

      this.router.navigate(['/login']);
      this.clearInputs();
    }
  }

  // Clear the input fields
  clearInputs() {
    this.inputPPSN = '';
    this.inputDOB = '';
    this.inputNewEmail = '';
  }

}
