import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular/standalone";
import { IonButton, IonInput, IonItem, IonList } from "@ionic/angular/standalone";
import { SupportService } from "@/app/services/support.service";
import { AuthService } from "@/lib/services/auth.service";
import { AlertService } from "@/lib/services/alert.service";
import { PendingRequestsStore } from "@/lib/stores/pending-requests.store";

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonList, IonItem, IonInput, IonButton],
})
export class LoginFormComponent implements AfterViewInit {
  @Output() loginComplete = new EventEmitter()
  @ViewChild('firstInput') firstInput: IonInput

  public form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  })

  constructor(
    private _auth: AuthService,
    private _alerts: AlertService,
    private _alertController: AlertController,
    private _support: SupportService,
    private fb: FormBuilder,
    public pendingRequests: PendingRequestsStore
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.firstInput.setFocus(), 500)
  }

  async onSubmit() {
    try {
      await this._auth.login(this.form.value.email!, this.form.value.password!)
    } catch (e) {
      this._alerts.error(e)
      return
    }
    this.loginComplete.emit()
  }

  async onForgotPasswordAlert() {
    const alert = await this._alertController.create({
      header: 'Forgot password',
      message: "We'll send you an email to reset your password",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Submit',
          handler: (inputs: {email: string}) => {
            this._onForgotPassword(inputs.email)
          }
        }
      ],
      inputs: [
        {
          placeholder: 'Enter your email',
          value: this.form.value.email ? this.form.value.email : '',
          name: 'email',
          attributes: {
            type: 'email',
          }
        }
      ]
    })
    await alert.present()
  }

  private async _onForgotPassword(email: string) {
    try {
      const response = await this._auth.forgotPassword(email)
      await this._alerts.success(response.message)
    } catch (e) {
      this._alerts.error(e)
      return
    }
  }

  onHelp() {
    this._support.presetSupportActionSheet()
  }
}
