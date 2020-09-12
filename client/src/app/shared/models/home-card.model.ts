export interface HomeCardModel {
  id: string;
  imageUrl: string;
  title: string;
  isMainCard: boolean;
  orderingIndex: number;
  description: string;
}

export class HomeCard implements HomeCardModel {
  id: string;
  description: string;
  isMainCard: boolean;
  orderingIndex: number;
  imageUrl: string;
  title: string;

  constructor(model: HomeCardModel) {
    this.id = model.id;
    this.description = model.description;
    this.isMainCard = model.isMainCard;
    this.orderingIndex = model.orderingIndex;
    this.imageUrl = model.imageUrl;
    this.title = model.title;
  }
}
