import {Sale} from "./sale";

export interface RankUmbrella {
  _id: any;
  image: string;
  name: string;
  description: string;
  price: number;
  fromUmbrella: number;
  toUmbrella: number;
  sales: Sale[];
}
