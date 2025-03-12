import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordDisabled: boolean = true;

  inputEmail: string = '';
  inputNewPassword: string = '';

  constructor(private router: Router, private storage: Storage) { 
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.inputEmail = await this.storage.get("email") || '';
    this.inputNewPassword = await this.storage.get("newPassword") || '';
    this.checkInputChanged();
  }

  checkInputChanged() {
    if (this.inputEmail != '' && this.inputNewPassword != '') {
      this.forgotPasswordDisabled = false;
    } else {
      this.forgotPasswordDisabled = true;
    }
  }

  goBack(){
    this.router.navigate(['/login']);
  }

  async forgotPassword() {
    this.storage.set("newPassword", this.inputNewPassword);
    this.router.navigate(['/login']).then(() => { 
      this.clearInputs();
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }

  clearInputs() { 
    this.inputEmail = '';
    this.inputNewPassword = '';
  }

}
