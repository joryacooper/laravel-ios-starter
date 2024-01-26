import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonButton, IonInput, IonItem, IonList, IonText, IonToggle } from "@ionic/angular/standalone";
import { SupportService } from "@/app/services/support.service";
import { AuthService } from "@/lib/services/auth.service";
import { AlertService } from "@/lib/services/alert.service";
import { PendingRequestsStore } from "@/lib/stores/pending-requests.store";

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonList, IonItem, IonInput, IonToggle, IonText, IonButton],
})
export class RegisterFormComponent implements AfterViewInit {
  @Output() registrationComplete = new EventEmitter()
  @ViewChild('firstInput') firstInput: IonInput

  public form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    accepted: [false, Validators.requiredTrue]
  })

  constructor(
    private _auth: AuthService,
    private _alerts: AlertService,
    private fb: FormBuilder,
    public pendingRequests: PendingRequestsStore,
    private _support: SupportService,
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.firstInput.setFocus(), 500)
  }

  async onSubmit() {
    try {
      await this._auth.register(this.form.value.email!, this.form.value.password!, this.form.value.accepted!)
    } catch (e) {
      this._alerts.error(e)
      return
    }
    this.registrationComplete.emit()
  }

  onHelp() {
    this._support.presetSupportActionSheet()
  }
}
