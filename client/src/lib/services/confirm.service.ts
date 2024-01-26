import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(
    private _alertController: AlertController
  ) {
  }

  async confirm(message: string = 'Are you sure?', title: string|null = null, destructive: boolean = false, confirmButtonLabel?: string) {
    let resolve: (value: (boolean | PromiseLike<boolean>)) => void
    const promise = new Promise<boolean>((r) => {
      resolve = r
    });

    const alert = await this._alertController.create({
      header: title ? title : message, // lol
      message: title ? message : undefined, // lol
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => resolve(false)
        },
        {
          text: confirmButtonLabel ? confirmButtonLabel : destructive ? 'Delete' : 'OK',
          role: destructive ? 'destructive' : undefined,
          handler: () => resolve(true)
        }
      ]
    })
    await alert.present()

    return promise
  }

  async confirmDelete(message: string = 'Are you sure?'): Promise<boolean> {
    return this.confirm(message, null, true)
  }
}
