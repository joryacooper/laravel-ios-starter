import {  Component, Input, ViewChild } from '@angular/core';
import { NavController } from "@ionic/angular/standalone";
import { ElementService } from "@/app/services/element.service";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { Article, ArticleUpdateDraft } from "@/app/models/article";
import { ArticleEditFormComponent } from "../form/article-edit-form.component";
import { ArticleStore } from "@/app/stores/article.store";
import { AlertService } from "@/lib/services/alert.service";
import { ConfirmService } from "@/lib/services/confirm.service";
import { getFirstError } from "@/lib/utils/form-errors";

@Component({
  selector: 'app-article-edit-modal',
  templateUrl: './article-edit-modal.component.html',
  standalone: true,
  imports: [
    ArticleEditFormComponent,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem
  ]
})
export class ArticleEditModalComponent {
  @Input() article: Article

  @ViewChild('modal') modal: IonModal;
  @ViewChild(ArticleEditFormComponent) formComponent: ArticleEditFormComponent;

  constructor(
    public elements: ElementService,
    private _articles: ArticleStore,
    private _alerts: AlertService,
    private _confirm: ConfirmService,
    private _nav: NavController,
  ) {
  }

  onCancel() {
    this.modal.dismiss();
  }

  onSubmit() {
    if (!this.formComponent.form.valid) {
      this._alerts.alert(getFirstError(this.formComponent.form) ?? 'Invalid data')
      return
    }
    const formData = this.formComponent.data()
    this._articles.update(this.article.id, formData as ArticleUpdateDraft, null, (e) => this._alerts.error(e))
    this.modal.dismiss()
  }

  async onDelete() {
    const confirmed = await this._confirm.confirmDelete()
    if (! confirmed) {
      return
    }

    this._articles.delete(this.article.id, (e) =>  this._alerts.error(e))
    this.modal.dismiss()
    this._nav.navigateRoot('/')
  }
}
