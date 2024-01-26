import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArticleStore } from "@/app/stores/article.store";
import { Article, ArticleType } from "@/app/models/article";
import {
  IonNote,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronForward, checkmark } from "ionicons/icons";
import { ArticleEditModalComponent } from "@/app/components/article/edit/modal/article-edit-modal.component";
import { startsWith } from "lodash";
import { NgForOf, NgIf } from "@angular/common";
import { ArticleListItemComponent } from "@/app/components/article/list-item/article-list-item.component";
import {
  IonBackButton,
  IonButton,
  IonButtons, IonContent, IonFooter,
  IonHeader,
  IonIcon, IonList,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { AppContextService } from "@/app/services/app-context.service";
import { AlertService } from "@/lib/services/alert.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  standalone: true,
  imports: [
    ArticleEditModalComponent,
    NgIf,
    ArticleListItemComponent,
    NgForOf,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonFooter,
    IonRefresher,
    IonRefresherContent,
    IonNote,
  ]
})
export class ArticleDetailComponent {
  private _id: Article['id']|string

  get article(): Article {
    return this._articles.byId[this._id]
  }
  get isActual() {
    return !startsWith(`${this._id}`, 'op')
  }

  constructor(
    private _route: ActivatedRoute,
    private _articles: ArticleStore,
    private _alerts: AlertService,
    private _appContext: AppContextService,
  ) {
    addIcons({chevronForward, checkmark})
    this._id = this._route.snapshot.paramMap.get('articleId')!
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

  protected readonly ArticleType = ArticleType;
}

