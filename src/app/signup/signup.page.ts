import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonTextarea} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton
    , IonTextarea
  ]
})
export class SignupPage{
  signUpDisabled: boolean = true;

  inputEmail: string = '';
  inputPassword: string = '';
  inputName: string = '';
  inputPhoneNo: string = '';
  inputAddress: string = '';
  inputEircode: string = '';
  inputCategory: string = '';
  inputPPSN: string = '';
  inputDOB: string = '';
  

  constructor(private router: Router, private storage: Storage) { }

  async ionViewWillEnter(){
    this.storage.create();
    this.onInputChanged();
  }

  onInputChanged(){
    const emailValid = this.inputEmail.includes('@');
    const passwordValid = this.inputPassword.length >= 8; // Check for at least 8 characters
    const nameValid = this.inputName.length >= 2; // Check for at least 2 character
    const phoneNoValid = this.inputPhoneNo.length >= 5; // Check for at least 5 character
    const addressValid = this.inputAddress.length >= 5; // Check for at least 5 character
    const eircodeValid = this.inputEircode.length >= 2; // Check for at least 2 character
    const carValid = this.inputCategory.length >= 1; // Check for at least 1 character
    const dobValid = this.inputDOB.length >= 7; // Check for at least 7 character
    const confirmPPSNValid = this.inputPPSN.length >= 5; // Check for at least 5 character
    this.signUpDisabled = !(emailValid && passwordValid && nameValid 
      && phoneNoValid && addressValid && eircodeValid && carValid && dobValid && confirmPPSNValid);
    }

  // Navigate to login page to check if user is registered
  async register(){
    await this.storage.set("email", this.inputEmail);
    await this.storage.set("password", this.inputPassword);
    await this.storage.set("name", this.inputName);
    await this.storage.set("phoneNo", this.inputPhoneNo);
    await this.storage.set("address", this.inputAddress);
    await this.storage.set("eircode", this.inputEircode);
    await this.storage.set("category", this.inputCategory);
    await this.storage.set("dob", this.inputDOB);
    await this.storage.set("ppsn", this.inputPPSN);
  
    this.router.navigate(['/login']).then(() => {
      this.clearInputs();
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
  
  back(){
    this.router.navigate(['/login']).then(() => {
      this.clearInputs();
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
  
  clearInputs() {
    this.inputName = '';
    this.inputEmail = '';
    this.inputPassword = '';
    this.inputPhoneNo = '';
    this.inputAddress = '';
    this.inputEircode = '';
    this.inputCategory = '';
    this.inputDOB = '';
    this.inputPPSN = '';
  }
}
