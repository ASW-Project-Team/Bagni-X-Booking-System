import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: 'bookingDate'
})
export class BookingDatePipe extends
  DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "d MMM, H:mm");
  }
}

@Pipe({
  name: 'bookingDateExtended'
})
export class BookingDatePipeExtended extends
  DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "d MMMM, H:mm");
  }
}
