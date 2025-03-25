import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonCard, IonCardTitle, IonTextarea,
  IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-rsa-result',
  templateUrl: './rsa-result.page.html',
  styleUrls: ['./rsa-result.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, CommonModule, FormsModule, IonButton,
   IonCard, IonCardTitle, IonTextarea, IonIcon]
})
export class RSAResultPage{

  // Variable
  inputName:string = '';
  inputDriverNo:string = '';
  inputDOB:string = '';
  inputEmail:string = '';
  inputCategory:string = '';
  inputPPSN:string = '';
  inputDTC:string = '';
  inputImageLink:string = '';

  // Storage Variable
  myName:string='';
  myDriverNo:string='';
  myDOB:string='';
  myEmail:string='';
  myCategory:string='';
  myPPSN:string='';

  constructor(private router: Router, private storage: Storage) { 
    addIcons({arrowBackOutline});
  }

  async onViewWillEnter(){
    this.myName = await this.storage.get("name");
    this.myDriverNo = await this.storage.get("driverNo");
    this.myDOB = await this.storage.get("dob");
    this.myEmail = await this.storage.get("email");
    this.myCategory = await this.storage.get("category");
    this.myPPSN = await this.storage.get("ppsn");
  }

  // Your Result has been sent, and back to Home Page
  clickResult() {
    if(this.inputName != this.myName && this.inputDriverNo != this.myDriverNo && this.inputDOB != this.myDOB &&
      this.inputEmail != this.myEmail && this.inputCategory != this.myCategory && this.inputPPSN != this.myPPSN){
        alert("Invalid! Please try again.");
      }else{
        this.router.navigate(['/home']);
      }
  }

  // Is the Image URL Link valid?
  isValidImageUrl(url: string): boolean {
    // Basic check for a valid URL format
    return /\.(jpeg|jpg|gif|png|svg|bmp)$/i.test(url);
  }
  
}
