import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from "@ionic/angular/standalone";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NetworkService } from "@/lib/services/network.service";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private _alertController: AlertController,
    private _router: Router,
    private _network: NetworkService,
  ) {
  }

  success(message: string) {
    return this.alert(message)
  }

  alert(message: string) {
    return this._presentAlert({
      header: message,
      buttons: ['OK']
    })
  }

  error(e: any) {
    console.error(e)
    let header = 'Unexpected error'
    if (e instanceof HttpErrorResponse) {
      if (`${e.status}`.startsWith('4')) {
        if (e.error['requires_pro']) {
          return this.presentProUpgradeAlert(e.error['message'])
        } else if (e.error['message']) {
          header = e.error['message']
        } else if (e.statusText !== 'OK') {
          header = e.statusText
        }
      } else if (`${e.status}`.startsWith('5')) {
        if (e.status === 503) {
          header = 'Sorry, the application is down for maintenance. Please try again later.'
        }
      } else if (!this._network.status.connected) {
        header = "Your internet appears to be offline."
      }
    }

    return this._presentAlert({
      header,
      buttons: ['Dismiss']
    })
  }

  public async presentProUpgradeAlert(message: string, beforeNavigate?: () => Promise<any>) {
    return this._presentAlert({
      header: message,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
        {
          text: 'Upgrade in Settings',
          role: 'confirm',
          handler: async () => {
            if (beforeNavigate) {
              await beforeNavigate()
            }
            this._router.navigate(['/settings/plan'])
          }
        },
      ]
    })
  }

  private async _presentAlert(opts?: AlertOptions) {
    await (await this._alertController.create(opts)).present()
  }
}
