import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonIcon} from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton
    , IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon
  ]
})
export class LoginPage{
  myEmail: string = '';
  myPassword: string = '';

  loginDisabled: boolean = true;
  inputEmail: string = '';
  inputPassword: string = '';

  constructor(private router: Router, private storage: Storage) { 
    this.storage.create();
    addIcons({logoInstagram, logoFacebook, logoGithub});
  }

  async onViewWillEnter(){
    this.myEmail = await this.storage.get("email") || '';
    this.myPassword = await this.storage.get("password") || '';
    this.onInputChanged();
  }

  onInputChanged(){
    const emailValid = this.inputEmail.includes('@');
    const passwordValid = this.inputPassword.length >= 8; // Check for at least 8 characters
    this.loginDisabled = !(emailValid && passwordValid);
  }
  
  // Navigate to home page
  loggedIn(){ 
    if(this.inputEmail == this.myEmail && this.inputPassword == this.myPassword){
    this.router.navigate(['/home']);
    }else if(this.inputEmail == null || this.inputPassword == null){
      alert('Invalid email or password. Please try again.');
    }
    else{
      alert('Invalid email or password. Please try again.');
    }
  }

  // Navigate to forgot email page
  forgotEmail(){
    this.router.navigate(['/forgot-email']); 
  }

  // Navigate to forgot password page
  forgotPassword(){
   this.router.navigate(['/forgot-password']);
  }

  // Navigate to sign up page
  register(){
    this.router.navigate(['/signup']);
  }

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
