export enum ArticleType {
  LONG = 'long',
  SHORT = 'short',
}

export interface Article {
  id: number
  name: string
  type: ArticleType,
  notes: string,
}

export interface ArticleCreateDraft {
  name: string
  type: ArticleType,
}

export type ArticleUpdateDraft = {
  name: string,
  notes: string,
}


