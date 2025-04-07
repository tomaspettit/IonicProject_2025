// IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, ToastController} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon]
})
export class ForgotPasswordPage implements OnInit{
  
  // Disabled Submit Button (Forgot Password)
  forgotPasswordDisabled: boolean = true;

  // Input Variables
  inputEmail: string = '';
  inputNewPassword: string = '';

  // Storage Variables
  myEmail: string = '';
  myNewPassword: string = '';

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add icons
    addIcons({arrowBackOutline, personOutline, alertCircleOutline, checkmarkCircleOutline});
  }

  // Create the storage instance
  async ngOnInit(): Promise<void> {
    await this.storage.create();
  }

  // Get the Email and Password from the storage
  async ionViewWillEnter() {
    this.myEmail = await this.storage.get("email");
    this.myNewPassword = await this.storage.get("password");
    console.log("Forgot Password: " + this.myEmail + " " + this.myNewPassword);
  }

  // Check if input fields are empty
  checkInputChanged() {
    const emailValid = this.inputEmail.includes('@') && (this.inputEmail.endsWith('.com') || this.inputEmail.endsWith('.ie')); // Basic email validation
    const passwordValid = this.inputNewPassword.length >= 5; // Adjust password strength requirements as needed
    this.forgotPasswordDisabled = !(emailValid && passwordValid); // Disable the button if any field is invalid
  }

  // Forgot password
  async forgotPassword() {
    // Check if the input fields are empty
    if (this.inputEmail != this.myEmail) {
      const toast = await this.toastController.create({
        message: 'Invalid email. Please try again.',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();

    // Check if the both passwords are the same
    }else if(this.inputNewPassword == this.myNewPassword){
      const toast = await this.toastController.create({
        message: 'Same Password. Try a different Password.',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();
    
    // Successfully changed password
    }else{
      this.storage.set("password", this.inputNewPassword);

      const toast = await this.toastController.create({
        message: 'Your new Password has been complete.',
        duration: 3000,
        icon: checkmarkCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();
      this.router.navigate(['/login']);
      this.clearInputs();
    }
  }

  // Clear input fields
  clearInputs() { 
    this.inputEmail = '';
    this.inputNewPassword = '';
  }
}
