import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reserva_interface } from '../models/reserva.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReservaService {

    api_url = environment.url_api + 'reservas'

    constructor(private http: HttpClient) { }

    createReserva(reserva: reserva_interface): Observable<any> {
        return this.http.post<any>(this.api_url, reserva);
    }
}
