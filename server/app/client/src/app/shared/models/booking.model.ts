import {Service} from "./service.model";
import {Umbrella} from "./umbrella.model";

export interface Booking {
  id: string,
  userId: string,
  umbrellas: Umbrella[],
  confirmed: boolean,
  cancelled: boolean,
  price: number,
  dateFrom: Date,
  dateTo: Date,
  services: Service[],
}
