import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavController } from "@ionic/angular/standalone";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonText } from "@ionic/angular/standalone";
import { AuthService } from "@/lib/services/auth.service";
import { AuthControlsComponent } from "@/lib/components/auth-controls/auth-controls.component";

@Component({
  selector: 'app-get-started',
  templateUrl: 'get-started.component.html',
  standalone: true,
  imports: [CommonModule, AuthControlsComponent, IonText, IonContent, IonList, IonItem, IonIcon, IonLabel],
})
export class GetStartedComponent {
  constructor(
    public auth: AuthService,
    private _nav: NavController,
  ) {
  }

  onAuthenticated() {
    this._nav.navigateRoot(['/'])
  }

  onClickContent() {
    (document.getElementById('open-register')!).click()
  }
}
