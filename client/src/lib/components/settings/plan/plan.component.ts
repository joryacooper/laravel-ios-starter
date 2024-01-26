import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  Purchases,
  PURCHASES_ERROR_CODE,
  PurchasesOffering,
  PurchasesPackage
} from "@revenuecat/purchases-capacitor";
import { has } from "lodash";
import { addIcons } from "ionicons";
import { sparkles } from "ionicons/icons";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonItem, IonLabel, IonList, IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { CustomerService } from "@/lib/services/customer.service";
import { AlertService } from "@/lib/services/alert.service";
import { environment } from "@/environments/environment";


@Component({
  selector: 'app-plan',
  templateUrl: 'plan.component.html',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonText, IonIcon, IonList, IonItem, IonLabel, IonFooter, IonButton, IonProgressBar],
})
export class PlanComponent  implements OnInit {
  public currentOffer: PurchasesOffering|null = null
  public loading: boolean = false

  constructor(
    public customer: CustomerService,
    private _alerts: AlertService
  ) {
    addIcons({sparkles})
  }

  ngOnInit() {
    this._getOfferings()
    this.customer.pullCustomerInfo()
  }


  private async _getOfferings() {
    try {
      this.loading = true
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        this.currentOffer = offerings.current
      }
      this.loading = false
    } catch (e) {
      this._alerts.error(e)
      this.loading = false
      return
    }
  }

  async onMonthly() {
    this.loading = true
    await this._handlePurchase(this.currentOffer?.monthly!)
    this.loading = false
  }

  async onYearly() {
    this.loading = true
    await this._handlePurchase(this.currentOffer?.annual!)
    this.loading = false
  }

  private async _handlePurchase(packageToBuy: PurchasesPackage) {
    try {
      const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToBuy });
      if (has(purchaseResult.customerInfo.entitlements.active, environment.revenue_cat.pro_entitlement)) {
        // nothing to do, our customer will be updated via the CustomerService
      }
    } catch (e: any) {
      if (e.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {

      } else {
        this._alerts.error(e)
        return
      }
    }
  }

  async onRestorePurchases() {
    try {
      this.loading = true
      await Purchases.restorePurchases()
      this.loading = false
    } catch (e) {
      this._alerts.alert("Cannot restore purchases")
      this.loading = false
      return
    }

  }
}
