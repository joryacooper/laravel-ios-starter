import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput, IonItem,
  IonList,
  IonTitle,
  IonToolbar, NavController
} from "@ionic/angular/standalone";
import { AlertService } from "@/lib/services/alert.service";
import { AuthService } from "@/lib/services/auth.service";
import { ConfirmService } from "@/lib/services/confirm.service";
import { PendingRequestsStore } from "@/lib/stores/pending-requests.store";


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonInput, IonButton],
})
export class ProfileComponent {
  public form = this.fb.group({
    email: [this._auth.user!.email, [Validators.email, Validators.required]],
  })

  constructor(
    private _alerts: AlertService,
    private _auth: AuthService,
    private fb: FormBuilder,
    private _confirm: ConfirmService,
    private _nav: NavController,
    public pendingRequests: PendingRequestsStore
  ) { }

  async onSubmit() {
    try {
      await this._auth.updateProfile(this.form.value as {email: string})
      await this._alerts.success('Your email has been updated.')
      await this._auth.pullUser()
      this.form.reset({
        email: this._auth.user!.email
      })
    } catch (e) {
      this._alerts.error(e)
      return
    }
  }

  async onDelete() {
    const confirmed = await this._confirm.confirmDelete('Are you sure? You will be logged out and your data will be permanently deleted. This cannot be undone.')
    if (!confirmed) {
      return
    }
    const confirmedAgain = await this._confirm.confirmDelete('Continue?')
    if (!confirmedAgain) {
      return
    }

    try {
      await this._auth.delete()
    } catch (e) {
      console.log(e)
      this._alerts.error(e)
      return
    }
    await this._auth.logout()
    await this._nav.navigateBack(['/get-started'])
    await this._alerts.success('Your account has been deleted.')
  }
}
