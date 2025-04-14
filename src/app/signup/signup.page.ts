//IMPORTS
import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonTextarea, 
  IonCard, IonIcon, IonToast, ToastController} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personOutline, helpCircleOutline, alertCircleOutline, checkmarkCircleOutline} from 'ionicons/icons';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton
    , IonTextarea, IonCard, IonIcon, IonToast
  ]
})
export class SignupPage implements OnInit{

  // Disable sign up button until all fields are filled
  signUpDisabled: boolean = true;

  // Input fields & set storage
  inputEmail: string = '';
  inputPassword: string = '';
  inputName: string = '';
  inputPhoneNo: string = '';
  inputAddress: string = '';
  inputEircode: string = '';
  inputCategory: string = '';
  inputPPSN: string = '';
  inputDOB: string = '';
  inputDriverNo: string = '';

  //Same Email
  myEmail:string = '';

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add icons to the app
    addIcons({ arrowBackOutline, personOutline, helpCircleOutline, alertCircleOutline, checkmarkCircleOutline });
  }

  // Create storage instance
  async ngOnInit(): Promise<void> {
    await this.storage.create();
  }

  // Check if the user is already logged in
  async ionViewWillEnter(){
    this.myEmail = await this.storage.get('email');
    console.log("Sign Up: " + this.myEmail);
  }

  // Check if all fields are filled and valid
  onInputChanged() {
    // Email validation
    const emailValid = this.inputEmail.includes('@') && (this.inputEmail.endsWith('.com') || this.inputEmail.endsWith('.ie'));
  
    // Password validation (at least one uppercase, one digit, and one special character)
    const passwordValid = this.inputPassword.length >= 4;
  
    // Name validation (at least 2 characters)
    const nameValid = this.inputName.length >= 2;
  
    // Phone number validation (only numbers and at least 10 digits, you can adjust the length as per your requirement)
    const phoneNoValid = this.inputPhoneNo.length >= 5;
  
    // Address validation (at least 5 characters)
    const addressValid = this.inputAddress.length >= 5;
  
    // Eircode validation (a common Irish Eircode pattern example, you can modify this if needed)
    const eircodeValid = this.inputEircode.length >= 3;
  
    // Car category validation (you can modify this based on the exact values expected)
    const carValid = this.inputCategory.length == 1;
  
    // Date of birth validation (in DD/MM/YYYY format)
    const dobValid = this.inputDOB.length >= 6;
  
    // PPSN validation (check for a length of 5 or specific format if applicable)
    const confirmPPSNValid = this.inputPPSN.length >= 5;
  
    // Driver number validation (at least 4 characters)
    const driverNoValid = this.inputDriverNo.length >= 4;
  
    // Enable the sign-up button if all validations pass
    this.signUpDisabled = !(emailValid && passwordValid && nameValid && phoneNoValid && addressValid &&
      eircodeValid && carValid && dobValid && confirmPPSNValid && driverNoValid); // Sign Up Button NOT disable
  }
  

  // Register the user and store their data
  async register(){
    if(this.inputEmail == '')
      {
        // Toast Controller for Empty Email
        const toast = await this.toastController.create({
          message: 'Please fill email',
          duration: 3000,
          icon: alertCircleOutline,
          swipeGesture:"vertical",
          position:"bottom",
          positionAnchor:"footer",
        });
        await toast.present();
      }
    else if(this.inputEmail == this.myEmail){
      // Toast Controller for Same Email
      const toast = await this.toastController.create({
        message: 'Same Email. Try a different Email',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();
      this.inputEmail = '';
      
    }else{
      // Store user data
      await this.storage.set("email", this.inputEmail);
      await this.storage.set("password", this.inputPassword);
      await this.storage.set("name", this.inputName);
      await this.storage.set("phoneNo", this.inputPhoneNo);
      await this.storage.set("address", this.inputAddress);
      await this.storage.set("eircode", this.inputEircode);
      await this.storage.set("category", this.inputCategory);
      await this.storage.set("dob", this.inputDOB);
      await this.storage.set("ppsn", this.inputPPSN);
      await this.storage.set("driverNo", this.inputDriverNo);

      // Toast Controller for completing your account
      const toast = await this.toastController.create({
        message: 'Sign Up Success',
        duration: 3000,
        icon: checkmarkCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
        positionAnchor:"footer",
      });
      await toast.present();

      // Navigate to the login page
      this.router.navigate(['/login']).then(() => {
        this.clearInputs();  // Clear input fields after registration
      }).catch((error) => {
        console.error('Navigation error:', error);
      });
    }
  }

  // Clear input fields
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
    this.inputDriverNo = '';
  }

  // After click the back button: it will show which of those two buttons would you like to go back from?
  public toastBackButtons = [
    {
      text: 'Sign Up or Login',
      handler: () => {
        this.router.navigate(['/sign-up-or-login']);
        this.clearInputs();
      },
    },
    {
      text: 'Login',
      handler: () => {
        this.router.navigate(['/login']);
        this.clearInputs();
      },
    },
  ]
  
}
