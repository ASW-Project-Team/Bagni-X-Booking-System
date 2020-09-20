import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../../../models/booking.model";
import {AvailabilityData} from "../../../../models/http-responses/availability-data.model";
import {RankUmbrella} from "../../../../models/rank-umbrella.model";
import {Service} from "../../../../models/service.model";
import {Umbrella} from "../../../../models/umbrella.model";
import {SalableItemModel} from "../../../../models/salable.model";

@Component({
  selector: 'app-customize-step',
  templateUrl: './customize-step.component.html',
  styleUrls: ['./customize-step.component.scss']
})
export class CustomizeStepComponent implements OnInit {
  @Input() booking: Booking;
  @Output() bookingChange: EventEmitter<Booking> = new EventEmitter<Booking>();
  availableRankings: RankUmbrella[];
  availableUmbrellas: Umbrella[];
  availableServices: Service[];
  validator: boolean = false;


  constructor() { }


  ngOnInit(): void { }


  setAvailableItems(availability: AvailabilityData) {
    if (availability != undefined) {
      this.availableUmbrellas = availability.availableUmbrellas.map(model => new Umbrella(model));
      this.availableRankings = availability.rankUmbrellas.map(rankModel => new RankUmbrella(rankModel));
      this.availableServices = availability.services.map(serviceModel => new Service(serviceModel))
        .filter(service => service.dailyPrice > 0);

    } else {
      this.availableServices = undefined;
      this.availableRankings = undefined;
      this.availableUmbrellas = undefined;
      // if going back to period, invalidate booking
      this.booking.umbrellas = [];
      this.booking.services = [];
      this.booking.price = 0.0;
      this.bookingChange.emit(this.booking);
      this.validator = false;
    }
  }


  getUmbrellasByRank(rank: RankUmbrella): Umbrella[] {
    const umbrellasByRank = this.availableUmbrellas
      .filter(umbrella => umbrella.rankUmbrellaId == rank.id)
      .map(umbrella => umbrella.generateBookableClone(rank));

    // inverse sort, to pick them in order with the push in item picker
    return umbrellasByRank.sort((a,b) => (a.number > b.number) ? -1 : ((b.number > a.number) ? 1 : 0))
  }


  insertUmbrella(item: SalableItemModel) {
    let umbrella = item as Umbrella;
    this.booking.umbrellas.push(umbrella);
    this.booking.price += umbrella.rankUmbrella.calculatePrice(this.booking.dateFrom, this.booking.dateTo);
    this.validator = true;
    this.bookingChange.emit(this.booking);
  }


  removeUmbrella(item: SalableItemModel) {
    let umbrella = item as Umbrella;
    const index = this.booking.umbrellas.indexOf(umbrella);
    if (index >= 0) {
      this.booking.umbrellas.splice(index, 1);
    }
    this.booking.price -= umbrella.calculatePrice(this.booking.dateFrom, this.booking.dateTo);

    if (this.booking.umbrellas.length <= 0) {
      this.validator = false;
    }
    this.bookingChange.emit(this.booking);
  }


  insertService(item: SalableItemModel) {
    let service = item as Service;
    this.booking.services.push(service);
    this.booking.price += service.calculatePrice(this.booking.dateFrom, this.booking.dateTo);
    this.bookingChange.emit(this.booking);
  }


  removeService(item: SalableItemModel) {
    let service = item as Service;
    const index = this.booking.services.indexOf(service);
    if (index >= 0) {
      this.booking.services.splice(index, 1);
    }
    this.booking.price -= service.calculatePrice(this.booking.dateFrom, this.booking.dateTo);
    this.bookingChange.emit(this.booking);
  }
}
