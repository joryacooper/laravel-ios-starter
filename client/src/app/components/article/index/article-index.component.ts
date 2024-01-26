import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { addIcons } from "ionicons";
import { add } from "ionicons/icons";
import { ElementService } from "@/app/services/element.service";
import { RefresherCustomEvent } from "@ionic/angular/standalone";
import { ArticleListItemComponent } from "@/app/components/article/list-item/article-list-item.component";
import { RouterLink } from "@angular/router";
import { Article } from "@/app/models/article";
import { ArticleCreateModalComponent } from "@/app/components/article/create/modal/article-create-modal.component";
import { AppContextService } from "@/app/services/app-context.service";
import {
  IonButton,
  IonButtons, IonContent, IonFooter,
  IonHeader,
  IonIcon, IonLabel, IonList, IonRefresher, IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { environment } from "@/environments/environment";
import { AuthService } from "@/lib/services/auth.service";
import { ArticleStore } from "@/app/stores/article.store";
import { AlertService } from "@/lib/services/alert.service";
import { CustomerService } from "@/lib/services/customer.service";

@Component({
  selector: 'app-article-index',
  templateUrl: 'article-index.component.html',
  standalone: true,
  imports: [CommonModule, ArticleListItemComponent, RouterLink, ArticleCreateModalComponent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonSearchbar, IonContent, IonRefresher, IonRefresherContent, IonList, IonLabel, IonFooter],
})
export class ArticleIndexComponent implements OnInit {
  get articles() {
    return this._articles.items ?? []
  }

  get hasArticles() {
    return this._articles.items !== undefined && this._articles.items.length
  }

  get hasNoArticles() {
    return this._articles.items !== undefined && !this._articles.items.length
  }

  get errorMessage() {
    return this._appContext.isError ? 'Error, pull to refresh' : null
  }

  constructor(
    public elements: ElementService,
    public auth: AuthService,
    private _articles: ArticleStore,
    private _appContext: AppContextService,
    private _alerts: AlertService,
    public customerService: CustomerService,
  ) {
    addIcons({add})
  }

  ngOnInit() {
    this._pullAppContext()
  }

  private async _pullAppContext() {
    try {
      await this._appContext.pull()
    } catch (e) {
      this._alerts.error(e)
    }
  }

  async refresh(ev: any) {
    console.log('refresh')
    await this._pullAppContext();

    // always do this
    (ev as RefresherCustomEvent).detail.complete()
  }

  onSupplementaryAdd() {
    // click the primary 'add' button to since that button is hooked up to
    // pop the modal
    document.getElementById('open-article-create')?.click()
  }

  articleTrackBy(index: number, article: Article) {
    return `${article.id}-${article.name}`
  }

  protected readonly Error = Error;
  protected readonly environment = environment;
}
