import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon]
})
export class ForgotPasswordPage implements OnInit {
  
  // Variables
  forgotPasswordDisabled: boolean = true;

  inputEmail: string = '';
  inputNewPassword: string = '';

  myEmail: string = '';
  myNewPassword: string = '';

  constructor(private router: Router, private storage: Storage) { 
    // Add icons
    addIcons({arrowBackOutline, personOutline});
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.myEmail = await this.storage.get("email");
    this.myNewPassword = await this.storage.get("password");
    this.checkInputChanged();
  }

  // Check if input fields are empty
  checkInputChanged() {
    if (this.inputEmail != '' && this.inputNewPassword != '') {
      this.forgotPasswordDisabled = false;
    } else {
      this.forgotPasswordDisabled = true;
    }
  }

  // Forgot password
  async forgotPassword() {
    if (this.inputEmail != this.myEmail) {
      alert('Invalid email. Please try again.');
    }else if(this.inputNewPassword == this.myNewPassword){
      alert('Same Password. Try a different Password');
    }else{
      this.storage.set("password", this.inputNewPassword);
      this.router.navigate(['/login']).then(() => { 
        this.clearInputs();
      }).catch((error) => {
        console.error('Navigation error:', error);
      });
    }
  }

  // Clear input fields
  clearInputs() { 
    this.inputEmail = '';
    this.inputNewPassword = '';
  }

}
