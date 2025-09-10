import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class NextStepService {
  private showButtonSubject = new BehaviorSubject<boolean>(false);
  private nextRouteSubject = new BehaviorSubject<string | null>(null);

  showButton$ = this.showButtonSubject.asObservable();
  nextRoute$ = this.nextRouteSubject.asObservable();

  setNextStep(show: boolean, route: string | null) {
    this.showButtonSubject.next(show);
    this.nextRouteSubject.next(route);
  }

  reset() {
    this.setNextStep(false, null);
  }
}