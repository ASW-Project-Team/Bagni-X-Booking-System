export interface HomeCardModel {
  _id: any;
  image: string;
  title: string;
  header: boolean;
  description: string;
}

export class HomeCard implements HomeCardModel {
  _id: any;
  description: string;
  header: boolean;
  image: string;
  title: string;

  constructor(model: HomeCardModel) {
    this._id = model._id;
    this.description = model.description;
    this.header = model.header;
    this.image = model.image;
    this.title = model.title;
  }
}
