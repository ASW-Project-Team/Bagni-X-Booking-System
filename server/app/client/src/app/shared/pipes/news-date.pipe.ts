import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: 'newsDate'
})
export class NewsDatePipe extends
  DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "MMM d");
  }
}


@Pipe({
  name: 'newsDateExtended'
})
export class NewsDatePipeExtended extends
  DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, "EEEE d MMMM y");
  }
}
