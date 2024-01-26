import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from "@capacitor/network";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public status: ConnectionStatus

  async initialize() {
    this.status = await Network.getStatus()

    Network.addListener('networkStatusChange', (status) => {
      this.status = status
    })
  }
}
