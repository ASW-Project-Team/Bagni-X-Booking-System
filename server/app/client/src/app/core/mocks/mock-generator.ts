import {Observable} from "rxjs";

export class MockGenerator {
  observableMock(mock: Object): Observable<any> {
    return new Observable((observer) => {
      observer.next(mock);

      // When the consumer unsubscribes, clean up data ready for next subscription.
      return { unsubscribe() {} };
    });
  }
}
