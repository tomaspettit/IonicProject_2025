import { Component} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonIcon} from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, logInOutline, personOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton
    , IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon
  ]
})
export class LoginPage{
  // Variables
  inputEmail: string = '';
  inputPassword: string = '';

  // Storage Variables
  myEmail: string = '';
  myPassword: string = '';

  // Disable Login Button by Default
  loginDisabled: boolean = true;

  constructor(private router: Router, private storage: Storage) {
    // Add icons (social media login buttons)
    addIcons({ logoInstagram, logoFacebook, logoGithub, logInOutline, personOutline });
  }

  // Get stored email and password from storage
  async ionViewWillEnter() {
    await this.storage.create();
    this.myEmail = await this.storage.get("email");
    this.myPassword = await this.storage.get("password");
  }

  // Input validation for email and password
  onInputChanged() {
    const emailValid = this.inputEmail.includes('@');
    const passwordValid = this.inputPassword.length >= 5; // Adjust password strength requirements as needed
    this.loginDisabled = !(emailValid && passwordValid);
  }

  // Attempt login
  async loggedIn() {
    console.log('Input Email:', this.inputEmail);
    console.log('Input Password:', this.inputPassword);

    // Secure password check (comparison to stored credentials)
    if (this.inputEmail !== this.myEmail && this.inputPassword !== this.myPassword) {
      alert('Invalid email or password. Please try again.');
      this.loginDisabled = false; // Allow retry after failure
    } else {
      console.log('Login successful, navigating to home');
      this.router.navigate(['/home']);
      // Optionally clear the input fields
      this.inputEmail = '';
      this.inputPassword = '';
    }
  }

  // Browser links
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
