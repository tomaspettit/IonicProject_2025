//IMPORTS
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonCard, IonCardTitle, IonTextarea,
  IonIcon, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, alertCircleOutline, checkmarkCircleOutline} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-rsa-result',
  templateUrl: './rsa-result.page.html',
  styleUrls: ['./rsa-result.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonInput, CommonModule, FormsModule, IonButton,
   IonCard, IonCardTitle, IonTextarea, IonIcon]
})
export class RSAResultPage{

  // Input Variables
  inputName:string = '';
  inputDriverNo:string = '';
  inputDOB:string = '';
  inputEmail:string = '';
  inputCategory:string = '';
  inputPPSN:string = '';
  inputDTC:string = '';
  inputImageLink:string = '';
  inputExplain:string='';

  // Disabled Submit Button
  disabledSubmitBtn:boolean=true;

  // Storage Variable
  myName:string='';
  myDriverNo:string='';
  myDOB:string='';
  myEmail:string='';
  myCategory:string='';
  myPPSN:string='';

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add icons to the app
    addIcons({arrowBackOutline, alertCircleOutline, checkmarkCircleOutline});
  }

  // Create storage
  async ionViewWillEnter(){
    await this.storage.create();
    this.myName = await this.storage.get("name");
    this.myDriverNo = await this.storage.get("driverNo");
    this.myDOB = await this.storage.get("dob");
    this.myEmail = await this.storage.get("email");
    this.myCategory = await this.storage.get("category");
    this.myPPSN = await this.storage.get("ppsn");
    console.log(this.myName+" "+this.myDriverNo+" "+this.myDOB+" "+this.myEmail+" "+this.myCategory+" "+this.myPPSN);
  }

  // When the all the input boxes has been set, the submit button will be undisabled
  onInputChangeForResult(){
    if(this.inputName.length >= 5 && this.inputCategory.length == 1 && this.inputDOB.length >= 6 && this.inputEmail.includes('@') 
      && this.inputPPSN.length >= 4 && this.inputDriverNo.length >= 5 && this.inputDTC.length >= 4 && this.inputImageLink != "" && this.inputExplain != ""){
      this.disabledSubmitBtn = false; // Submit Button NOT disable
    }else{
      this.disabledSubmitBtn = true; // Submit Button disable
    }
  }

  // Return back to the Home Page
  clickBackBtn(){
    this.router.navigate(['/home']);
    this.clearInputs();
  }


  // Your Result has been sent, and back to Home Page
  async clickResult() {
    // Check if the any input is empty or not
    if(this.inputName != this.myName || this.inputDriverNo != this.myDriverNo || this.inputDOB != this.myDOB ||
      this.inputEmail != this.myEmail || this.inputCategory != this.myCategory || this.inputPPSN != this.myPPSN){
        const toast = await this.toastController.create({
          message: 'Invalid! Please try again.',
          duration: 3000,
          icon: alertCircleOutline,
          swipeGesture:"vertical",
          position:"bottom",
          positionAnchor:"footer",
        });
        await toast.present();

      // RSA Result has been sent
      }else{
        const toast = await this.toastController.create({
          message: 'Your RSA result has been sent. Thank you.',
          duration: 3000,
          icon: checkmarkCircleOutline,
          swipeGesture:"vertical",
          position:"bottom",
          positionAnchor:"footer",
        });
        await toast.present();
        this.router.navigate(['/home']);
        this.clearInputs();
      }
  }

  // Is the Image URL Link valid?
  isValidImageUrl(url: string): boolean {
    // Basic check for a valid URL format
    return /\.(jpeg|jpg|gif|png|svg|bmp)$/i.test(url);
  }

  // Clear input fields
  clearInputs() {
    this.inputName = '';
    this.inputEmail = '';
    this.inputCategory = '';
    this.inputDOB = '';
    this.inputPPSN = '';
    this.inputDriverNo = '';
    this.inputDTC = '';
    this.inputImageLink = '';
    this.inputExplain = '';
  }
  
}
