import { Injectable } from '@angular/core';
import { ActionSheetController } from "@ionic/angular/standalone";
import { Clipboard } from "@capacitor/clipboard";
import { AlertService } from "@/lib/services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  constructor(
    private _actionSheetController: ActionSheetController,
    private _alerts: AlertService,
  ) {
  }

  async presetSupportActionSheet() {
    const alert = await this._actionSheetController.create({
      header: 'Choose an option to get support',

      buttons: [
        {
          text: 'Copy email address',
          handler: async () => {
            await Clipboard.write({string: 'email@email.com'})
            await this._alerts.success("Copied email (email@email.com) to clipboard.")
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],

    })
    await alert.present()
  }
}
