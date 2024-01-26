import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AlertController } from "@ionic/angular/standalone";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput, IonItem,
  IonList,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { AlertService } from "@/lib/services/alert.service";
import { AuthService } from "@/lib/services/auth.service";
import { PendingRequestsStore } from "@/lib/stores/pending-requests.store";


@Component({
  selector: 'app-password',
  templateUrl: 'password.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton],
})
export class PasswordComponent {
  public form = this.fb.group({
    current_password: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  })

  constructor(
    private _alerts: AlertService,
    private _alertController: AlertController,
    private _auth: AuthService,
    private fb: FormBuilder,
    public pendingRequests: PendingRequestsStore
  ) { }

  async onChangePassword() {
    try {
      await this._auth.updatePassword(this.form.value as {current_password: string, password: string, password_confirmation: string})
      this.form.reset()
      await this._alerts.success('Your password has been updated.')
    } catch (e) {
      this._alerts.error(e)
      return
    }
  }

  async onForgotPasswordAlert() {
    const alert = await this._alertController.create({
      header: 'Forgot password',
      message: `We'll send you an email to ${this._auth.user!.email} to reset your password`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
            this._onForgotPassword()
          }
        }
      ],
    })
    await alert.present()
  }

  private async _onForgotPassword() {
    try {
      const response = await this._auth.forgotPassword(this._auth.user!.email)
      await this._alerts.success(response.message)
    } catch (e) {
      this._alerts.error(e)
      return
    }
  }
}
