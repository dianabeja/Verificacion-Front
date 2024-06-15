import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {
  
  numPassengers: number = 1;
  seatClass: string = 'ejecutiva';
  selectedTariff: string = '';

  constructor(private router: Router) { }

  selectTariff(tariff: string) {
    this.selectedTariff = tariff;
    console.log('Tarifa seleccionada:', this.selectedTariff);
  }

  continue() {
    if (this.selectedTariff) {
      this.router.navigate(['/passenger-form'], { queryParams: { numPassengers: this.numPassengers, seatClass: this.seatClass } });
    } else {
      alert('Por favor, selecciona una tarifa antes de continuar.');
    }
  }

  
}