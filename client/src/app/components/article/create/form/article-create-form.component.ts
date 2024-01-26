import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { ArticleType } from "@/app/models/article";
import {
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTextarea
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-article-create-form',
  templateUrl: './article-create-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    IonItem,
    IonList,
    IonRow,
    IonGrid,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonTextarea
  ]
})
export class ArticleCreateFormComponent implements AfterViewInit {
  @ViewChild('firstInput') firstInput: IonInput

  public form = this.fb.group({
    name: ['', Validators.required],
    type: new FormControl<ArticleType>(ArticleType.SHORT, Validators.required),
    notes: [''],
  })

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.firstInput.setFocus(), 500)
  }

  public data() {
    return this.form.value
  }

  protected readonly ArticleType = ArticleType;
}
