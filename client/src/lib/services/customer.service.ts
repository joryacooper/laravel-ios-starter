import { Injectable } from '@angular/core';
import { CustomerInfo, Purchases } from "@revenuecat/purchases-capacitor";
import { AuthService } from "./auth.service";
import { ProSubscriptionApi } from "../apis/pro-subscription.api";
import { has } from "lodash";
import { Platform } from "@ionic/angular/standalone";
import { environment } from "@/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public customerInfo: CustomerInfo

  get isPro() {
    return has(this.customerInfo?.entitlements.active, environment.revenue_cat.pro_entitlement)
  }

  get isMonthly() {
    return this.customerInfo.activeSubscriptions.includes(environment.revenue_cat.monthly_subscription)
  }

  get isYearly() {
    return this.customerInfo.activeSubscriptions.includes(environment.revenue_cat.yearly_subscription)
  }

  constructor(
    private _api: ProSubscriptionApi,
    private _auth: AuthService,
    private _platform: Platform
  ) {
  }

  setupPurchases() {
    this._platform.ready().then(async () => {
      await Purchases.configure({
        apiKey: environment.revenue_cat.api_key,
        appUserID: this._auth.user!.id,
      });
      await Purchases.addCustomerInfoUpdateListener(async (customerInfo: CustomerInfo) => {
        try {
          await this._customerInfoUpdatedListener(customerInfo)
        } catch (e) {
          console.error('CustomerService@setupPurchases: error executing customer info update listener:', e)
        }
      })
    });
  }

  /*
    Updates our app db with current version of is_pro based on revCat's value
   */
  private async _customerInfoUpdatedListener(customerInfo: CustomerInfo) {
    this.customerInfo = customerInfo
    const appProStatus = this._auth.user!.is_pro
    const revCatProStatus = customerInfo.entitlements.active[environment.revenue_cat.pro_entitlement] !== undefined

    if (!appProStatus && revCatProStatus) {
      this._auth.user = await this._api.markAsPro()
      return
    }

    if (appProStatus && !revCatProStatus) {
      this._auth.user = await this._api.markAsNotPro()
      return
    }
  }

  public async pullCustomerInfo() {
    this.customerInfo = (await Purchases.getCustomerInfo()).customerInfo
  }

}
