import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { infoViaje } from '../models/infoViaje.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  api_url= environment.url_api + 'viajes'

  constructor(private http: HttpClient) { }

  getAllViajes(): Observable<infoViaje[]> {
    return this.http.get<infoViaje[]>(`${this.api_url}`);
  }

  getViajeById(id: number): Observable<infoViaje> {
    return this.http.get<infoViaje>(`${this.api_url}/${id}`);
  }

}


