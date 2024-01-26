import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavController } from "@ionic/angular/standalone";
import { ElementService } from "@/app/services/element.service";
import { RouterLink } from "@angular/router";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { SupportService } from "@/app/services/support.service";
import { AuthControlsComponent } from "@/lib/components/auth-controls/auth-controls.component";
import { AuthService } from "@/lib/services/auth.service";
import { ConfirmService } from "@/lib/services/confirm.service";
import { CustomerService } from "@/lib/services/customer.service";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  standalone: true,
  imports: [CommonModule, AuthControlsComponent, RouterLink, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton],
})
export class SettingsPage {
  constructor(
    public auth: AuthService,
    public elements: ElementService,
    private _nav: NavController,
    private _confirm: ConfirmService,
    public customer: CustomerService,
    private _support: SupportService,
  ) {
  }

  async onLogOut() {
    const confirmed = await this._confirm.confirm('Are you sure?', null, false, 'Log out')
    if (!confirmed) {
      return
    }
    await this.auth.logout()
    await this._nav.navigateBack(['/get-started'])
  }

  onHelp() {
    this._support.presetSupportActionSheet()
  }
}
