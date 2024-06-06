import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscarVuelosService {

  constructor(private http: HttpClient) { }

  getVuelos(lugarD: string, lugarO: string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get(`http://localhost:3000/api/viajes/busq?lugarD=${lugarD}&lugarO=${lugarO}`)
  }

  getVuelosConFecha(lugarD: string, lugarO: string, fechasalida: string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    return this.http.get(`http://localhost:3000/api/viajes/busq?lugarD=${lugarD}&lugarO=${lugarO}&fechasalida=${fechasalida}`)
  }
}
