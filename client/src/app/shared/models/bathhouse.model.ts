export interface BathhouseModel {
  name: string,
  logoUrl?: string,
  seasonStart: Date,
  seasonEnd: Date
}

export class Bathhouse implements BathhouseModel {
  logoUrl: string;
  name: string;
  seasonEnd: Date;
  seasonStart: Date;

  constructor(model: BathhouseModel) {
    this.name = model.name;
    this.logoUrl = model.logoUrl;
    this.seasonStart = new Date(model.seasonStart);
    this.seasonEnd = new Date(model.seasonEnd);
  }
}
