import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon 
  , IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-rsa-result',
  templateUrl: './rsa-result.page.html',
  styleUrls: ['./rsa-result.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon,
    IonButton
  ]
})
export class RSAResultPage implements OnInit {

  constructor(private router: Router, private storage: Storage) { 
    addIcons({logoInstagram, logoFacebook, logoGithub});
  }

  ngOnInit() {
  }

  clickResult() {
    this.router.navigate(['/home']);
  }

  backButton(){
    this.router.navigate(['/home']);
  }

}
