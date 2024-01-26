import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonButton, IonButtons, IonIcon, IonFooter, IonRouterOutlet, IonModal
} from '@ionic/angular/standalone';

import { RouterLink } from "@angular/router";
import { ElementService } from "@/app/services/element.service";
import { AuthService } from "@/lib/services/auth.service";
import { PendingRequestsStore } from "@/lib/stores/pending-requests.store";
import { RegisterFormComponent } from "@/lib/components/register/form/register-form.component";
import { LoginFormComponent } from "@/lib/components/login/form/login-form.component";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-controls',
  templateUrl: 'auth-controls.component.html',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonFooter, RouterLink, IonRouterOutlet, IonModal, RegisterFormComponent, LoginFormComponent],
})
export class AuthControlsComponent {
  @Output('authenticated') authenticatedEvent = new EventEmitter()
  @ViewChild('loginModal') loginModal: IonModal;
  @ViewChild('registerModal') registerModal: IonModal;

  constructor(
    public elements: ElementService,
    public auth: AuthService,
    public pendingRequests: PendingRequestsStore,
  ) {
  }

  onCloseRegister() {
    this.registerModal.dismiss()
  }

  onCloseLogin() {
    this.loginModal.dismiss()
  }

  onRegistrationComplete() {
    this.onCloseRegister()
    this.authenticatedEvent.emit()
  }

  onLoginComplete() {
    this.onCloseLogin()
    this.authenticatedEvent.emit()
  }

  protected readonly environment = environment;
}
