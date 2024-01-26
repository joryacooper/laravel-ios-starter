import { Component, OnInit } from '@angular/core';
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent, IonIcon,
  IonRouterOutlet,
  IonText
} from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { refreshOutline } from "ionicons/icons";
import { Router } from "@angular/router";
import { AuthService } from "@/lib/services/auth.service";
import { AlertService } from "@/lib/services/alert.service";
import { CustomerService } from "@/lib/services/customer.service";
import { ConfirmService } from "@/lib/services/confirm.service";

@Component({
  selector: 'app-auth-root',
  templateUrl: 'auth-root.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonText, IonContent, IonButton, IonCard, IonCardContent, IonIcon],
})
export class AuthRootComponent implements OnInit {
  public errorMessage: string|null = null

  constructor(
    public auth: AuthService,
    private _alerts: AlertService,
    private _customerService: CustomerService,
    private _router: Router,
    private _confirm: ConfirmService
  ) {
    addIcons({refreshOutline})
  }

  ngOnInit() {
    this.initUser()
  }

  async initUser() {
    try {
      await this.auth.pullUser()
    } catch (e) {
      this._alerts.error(e)
      this.errorMessage = "We encountered an error when loading your application."
      return
    }
    this.errorMessage = null

    this._customerService.setupPurchases()
  }

  async retry() {
    await this.initUser()
    this._router.navigate(['/'])
  }

  async logout() {
    const confirmed = await this._confirm.confirm()
    if (!confirmed) {
      return
    }
    this.auth.logout()
    this._router.navigate(['/get-started'])
  }

}
