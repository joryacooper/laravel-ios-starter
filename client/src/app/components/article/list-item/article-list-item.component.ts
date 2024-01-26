import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from "@/app/models/article";
import {
  IonCol,
  IonGrid,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
  IonRow
} from "@ionic/angular/standalone";
import { ConfirmService } from "@/lib/services/confirm.service";
import { ArticleStore } from "@/app/stores/article.store";
import { AlertService } from "@/lib/services/alert.service";


@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, IonItemSliding, IonItem, IonLabel, IonNote, IonItemOptions, IonItemOption, IonGrid, IonRow, IonCol],
})
export class ArticleListItemComponent {
  @Input() article: Article;

  constructor(
    private _confirm: ConfirmService,
    private _articles: ArticleStore,
    private _alerts: AlertService
  ) {

  }

  async onDelete() {
    const confirmed = await this._confirm.confirmDelete()
    if (! confirmed) {
      return
    }

    this._articles.delete(this.article.id, (e) =>  this._alerts.error(e))
  }

}
