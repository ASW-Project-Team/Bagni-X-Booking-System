export interface NewsModel {
  _id: any;
  image: string;
  title: string;
  date: Date;
  description: string;
}

export class News implements NewsModel {
  _id: any;
  date: Date;
  description: string;
  image: string;
  title: string;

  constructor(model: NewsModel) {
    this._id = model._id;
    this.date = model.date;
    this.description = model.description;
    this.image = model.image;
    this.title = model.title;
  }
}
