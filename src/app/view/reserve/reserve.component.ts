import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { reserva_interface } from 'src/app/models/reserva.model';
import { ReservaService } from 'src/app/service/reserva.service';
import { ViajeService } from 'src/app/service/viaje.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {

  numPassengers: number = 1;
  seatClass: string = 'ejecutiva';
  selectedTariff: string = '';
  viaje: any; // Variable para almacenar los detalles del viaje
  duracion: string | undefined;
  origen: string | null | undefined;
  destino: string | null | undefined;
  selectedClass: string = 'Ejecutiva';
  pasajeros: number[] = [1];

  // constructor(private router: Router, private viajeService: ViajeService, private reservaService: ReservaService) {
  //   this.origen = localStorage.getItem('origen');
  //   this.destino = localStorage.getItem('destino');
  // }
  constructor(private router: Router, private viajeService: ViajeService) {
    this.origen = localStorage.getItem('origen');
    this.destino = localStorage.getItem('destino');
  }


  // constructor(private router: Router) { }

  ngOnInit(): void {
    const viajeId = localStorage.getItem('viajeID');
    if (viajeId) {
      this.viajeService.getViajeById(parseInt(viajeId, 10)).subscribe(data => {
        this.viaje = data;
      });
    }
  }

  calculateDuration(): string {
    if (!this.viaje || !this.viaje.fechaSalida || !this.viaje.fechaLlegada) {
      return 'N/A';
    }

    const fechaSalida = new Date(this.viaje.fechaSalida);
    const fechaLlegada = new Date(this.viaje.fechaLlegada);

    const diffInMs = fechaLlegada.getTime() - fechaSalida.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffInHours.toString().padStart(2, '0')}:${diffInMinutes.toString().padStart(2, '0')}`;
  }




  dropdownVisible: boolean = false;

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  preventInput(event: KeyboardEvent): void {
    const keysAllowed = ['ArrowUp', 'ArrowDown', 'Tab', 'Shift', 'Control', 'Alt'];
    if (keysAllowed.indexOf(event.key) === -1) {
      event.preventDefault();
    }
  }

  updateNumPassengers(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.numPassengers = Number(inputElement.value);
    this.pasajeros = Array.from({length: this.numPassengers}, (_, i) => i + 1);
  }

  updateClass(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedClass = selectElement.options[selectElement.selectedIndex].text;
  }

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
  // continue() {
  //   if (this.selectedTariff) {
  //     const reservationDate = new Date();
  //     const expirationDate = new Date(reservationDate.getTime() + 5 * 60000); // 5 minutos después

  //     const reserva: reserva_interface = {
  //       Vuelo: this.viaje?.vueloId.Vuelo_ID,
  //       Usuario: 1,
  //       fechaReserva: reservationDate.toISOString(),
  //       fechaExpiracion: expirationDate.toISOString(),
  //       cantidadPasajeros: this.numPassengers
  //     };

  //     console.log(reserva);


  //     this.reservaService.createReserva(reserva).subscribe(
  //       response => {
  //         console.log('Reserva creada:', response);
  //         this.router.navigate(['/passenger-form'], { queryParams: { numPassengers: this.numPassengers, seatClass: this.seatClass } });
  //       },
  //       error => {
  //         console.error('Error al crear la reserva:', error);
  //         alert('Hubo un problema al crear la reserva. Por favor, intenta nuevamente.');
  //       }
  //     );
  //   } else {
  //     alert('Por favor, selecciona una tarifa antes de continuar.');
  //   }
  // }



}