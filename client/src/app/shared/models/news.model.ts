
export interface NewsModel {
  id: any;
  imageUrl: string;
  title: string;
  date: Date;
  article: string;
}

export class News implements NewsModel {
  id: any;
  date: Date;
  article: string;
  imageUrl: string;
  title: string;

  constructor(model: NewsModel) {
    this.id = model.id;
    this.date = new Date(model.date);
    this.article = model.article;
    this.imageUrl = model.imageUrl;
    this.title = model.title;
  }
}
