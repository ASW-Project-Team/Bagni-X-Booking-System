import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {CostLine, UnifiedService} from "../../models/component-specific/booking-summary.model";

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent implements OnInit {
  @Input('booking') booking: Booking;
  bookingDays: number;


  constructor() {
  }

  ngOnInit(): void {
    this.bookingDays = this.computeBookingDays();
  }

  private computeBookingDays(): number {
    let diff = Math.abs(this.booking.dateFrom.getTime() - this.booking.dateTo.getTime());

    if (diff < 24 * 60 * 1000) {
      // considerate half day, if booked for less than a day
      return 0.5;
    } else {
      // consider days between otherwise
      return Math.ceil(diff / (1000 * 3600 * 24));
    }
  }

  computeCostLines(): CostLine[] {
    let costLines: CostLine[] = [];

    for (let umbrella of this.booking.umbrellas) {
      costLines.push({
        name: "Ombrellone n°" + umbrella.number,
        cost: umbrella.rank.price * this.bookingDays
      });
    }

    let unifiedServicesMap: Map<string, UnifiedService> = new Map();

    for (let service of this.booking.services) {
      if (unifiedServicesMap.has(service._id)) {
        let currentService = unifiedServicesMap.get(service._id);
        currentService.quantity++;
        currentService.totalCost += service.price;
        unifiedServicesMap.set(service._id, currentService);
      } else {
        let newUnifiedServ: UnifiedService = {
          name: service.title,
          quantity: 1,
          totalCost: service.price
        }
        unifiedServicesMap.set(service._id, newUnifiedServ);
      }
    }

    unifiedServicesMap.forEach(value => {
      costLines.push({
        name: value.name + " x" + value.quantity,
        cost: value.totalCost
      });
    });

    return costLines;
  }

  computeTotal(): CostLine {
    return {
      name: 'Totale',
      cost: this.booking.price
    }
  }
}
