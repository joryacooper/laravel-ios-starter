import { Component, ViewChild } from '@angular/core';
import { NavController } from "@ionic/angular/standalone";
import { ElementService } from "@/app/services/element.service";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { ArticleCreateFormComponent } from "@/app/components/article/create/form/article-create-form.component";
import { ArticleCreateDraft } from "@/app/models/article";
import { ArticleStore } from "@/app/stores/article.store";
import { AlertService } from "@/lib/services/alert.service";
import { getFirstError } from "@/lib/utils/form-errors";

@Component({
  selector: 'app-article-create-modal',
  templateUrl: './article-create-modal.component.html',
  standalone: true,
  imports: [
    ArticleCreateFormComponent,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent
  ]
})
export class ArticleCreateModalComponent {
  @ViewChild('createIonModal') modal: IonModal;
  @ViewChild(ArticleCreateFormComponent) formComponent: ArticleCreateFormComponent;

  constructor(
    public elements: ElementService,
    private _articles: ArticleStore,
    private _nav: NavController,
    private _alerts: AlertService,
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
    this._articles.create(formData as ArticleCreateDraft,
      async (optimistic) => {
        await this._nav.navigateRoot(['/articles', optimistic.id])
        await this.modal.dismiss()
      },
      async (actual) => {
        await this._nav.navigateRoot(['/articles', actual.id])
      },
      async (error) => {
        await this._nav.navigateRoot(['/'])
        await this._alerts.error(error)
      }
      )
  }

}
