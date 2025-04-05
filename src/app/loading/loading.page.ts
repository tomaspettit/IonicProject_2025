//IMPORTS
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonProgressBar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
  standalone: true,
  imports: [IonContent, IonProgressBar, CommonModule, FormsModule]
})
export class LoadingPage{
  public progress = 0; // Starting with 0 like 0%

  constructor(private router: Router) {
    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;

          // Navigate to another page when the progress reaches 100%
          this.router.navigate(['/sign-up-or-login']);
        }, 1000);
      }
    }, 100);
  }
}
