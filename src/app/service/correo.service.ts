import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { correo_interface } from '../models/correo.model';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  api_url= environment.url_api + 'client/passwordupdate'
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  option = {headers: this.headers}

  correo(Destinatario: string): Observable<correo_interface>{
  let result =  this.http.post<correo_interface>(this.api_url,{Destinatario})
  return result;
}
}