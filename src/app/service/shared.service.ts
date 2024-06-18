import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private numPassengers: number = 1;
  private seatClass: string = 'ejecutiva';

  setNumPassengers(num: number) {
    this.numPassengers = num;
  }

  getNumPassengers(): number {
    return this.numPassengers;
  }

  setSeatClass(seatClass: string) {
    this.seatClass = seatClass;
  }

  getSeatClass(): string {
    return this.seatClass;
  }
}
