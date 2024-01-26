import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Article, ArticleType } from "@/app/models/article";
import { IonGrid, IonInput, IonItem, IonList, IonRow, IonText, IonTextarea } from "@ionic/angular/standalone";

@Component({
  selector: 'app-article-edit-form',
  templateUrl: './article-edit-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    IonList,
    IonItem,
    IonGrid,
    IonRow,
    IonInput,
    IonTextarea,
    IonText
  ]
})
export class ArticleEditFormComponent implements OnInit {
  @Input() article: Article

  public form = this.fb.group({
    name: ['', Validators.required],
    notes: [''],
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form.reset(this.article)
  }

  public data() {
    return this.form.value
  }

  protected readonly ArticleType = ArticleType;
}
