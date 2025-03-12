import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.page.html',
  styleUrls: ['./forgot-email.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton]
})
export class ForgotEmailPage implements OnInit {
  forgotEmailDisabled: boolean = true;

  inputPPSN: string = '';
  inputDOB: string = '';
  inputNewEmail: string = '';

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.inputPPSN = await this.storage.get('ppsn');
    this.inputDOB = await this.storage.get('dob');
    this.inputNewEmail = await this.storage.get('email');
    this.checkInputChanged();
  }

  checkInputChanged() {
    if (this.inputPPSN != '' && this.inputDOB != '' && this.inputNewEmail != '') {
      this.forgotEmailDisabled = false;
    } else {
      this.forgotEmailDisabled = true;
    }
  }

  goBack(){
    this.router.navigate(['/login']).then(() => { 
      this.clearInputs();
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }

  async forgotEmail() {
    await this.storage.set('email', this.inputNewEmail);

    this.router.navigate(['/login']).then(() => { 
      this.clearInputs();
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }

  clearInputs() {
    this.inputPPSN = '';
    this.inputDOB = '';
    this.inputNewEmail = '';
  }

}
