import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from 'src/app/service/reserva.service';
import { reserva_interface } from 'src/app/models/reserva.model';
import { ViajeService } from 'src/app/service/viaje.service';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.css']
})
export class PassengerFormComponent implements OnInit {
  numPassengers: number = 0;
  seatClass: string | undefined;
  passengerForms: FormGroup[] = [];
  currentPassengerIndex: number = 0;
  allFormsSubmitted: boolean = false;
  viaje: any; // Variable para almacenar los detalles del viaje

  // constructor(
  //   private route: ActivatedRoute,
  //   private fb: FormBuilder
  // ) { }
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private viajeService: ViajeService,
    private reservaService: ReservaService
  ) { 
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numPassengers = +params['numPassengers'] || 1;
      this.seatClass = params['seatClass'] || 'ejecutiva';
      this.createPassengerForms();
    });
    const viajeId = localStorage.getItem('viajeID');
    if (viajeId) {
      this.viajeService.getViajeById(parseInt(viajeId, 10)).subscribe(data => {
        this.viaje = data;
      });
    }
  }

  createPassengerForms(): void {
    for (let i = 0; i < this.numPassengers!; i++) {
      this.passengerForms.push(this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }));
    }
  }

  // onSubmit() {
  //   if (this.passengerForms[this.currentPassengerIndex].valid) {
  //     console.log(this.passengerForms[this.currentPassengerIndex].value);
  //     this.currentPassengerIndex++;
  //     if (this.currentPassengerIndex >= (this.numPassengers ?? 0)) {
  //       this.allFormsSubmitted = true;
  //     }
  //   } else {
  //     console.log('Form is invalid.');
  //   }
  // }

  onSubmit() {
    if (this.passengerForms[this.currentPassengerIndex].valid) {
        console.log(this.passengerForms[this.currentPassengerIndex].value);
        this.currentPassengerIndex++;
        if (this.currentPassengerIndex >= (this.numPassengers ?? 0)) {
            const reservationDate = new Date();
            const expirationDate = new Date(reservationDate.getTime() + 5 * 60000); // 5 minutos después

            const reserva: reserva_interface = {
                Vuelo: this.viaje?.vueloId.Vuelo_ID,
                Usuario: 1,
                fechaReserva: reservationDate.toISOString(),
                fechaExpiracion: expirationDate.toISOString(),
                cantidadPasajeros: this.numPassengers
            };

            console.log(reserva);

            this.reservaService.createReserva(reserva).subscribe(
                response => {
                    console.log('Reserva creada:', response);
                    alert('Reserva creada.');
                },
                error => {
                    console.error('Error al crear la reserva:', error);
                    alert('Hubo un problema al crear la reserva. Por favor, intenta nuevamente.');
                }
            );
            this.allFormsSubmitted = true;
        }
    } else {
        console.log('Form is invalid.');
    }
}


  // continue() {
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
  //       },
  //       error => {
  //         console.error('Error al crear la reserva:', error);
  //         alert('Hubo un problema al crear la reserva. Por favor, intenta nuevamente.');
  //       }
  //     );
  // }



}
