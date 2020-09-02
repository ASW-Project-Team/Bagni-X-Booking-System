import {Sale} from "./sale.model";
import {Umbrella} from "./umbrella.model";

export interface RankUmbrella {
  _id: any;
  image: string;
  name: string;
  description: string;
  price: number;
  fromUmbrella: number;
  toUmbrella: number;
  sales: Sale[];
  availableUmbrellas?: Umbrella[]
}
