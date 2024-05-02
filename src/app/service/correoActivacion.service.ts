import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { correoActivacion_interface } from '../models/correoActivacion.model';
@Injectable({
  providedIn: 'root'
})
export class CorreoActivacionService {
  // api_url= environment.url_api + 'client/emailvalidation'
  api_url= environment.url_api + 'client/solicitarCodigo'
  // api_url = 'http://localhost:80/client/emailvalidation'
  
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  option = {headers: this.headers}

  correoActivacion(Destinatario: string): Observable<correoActivacion_interface>{
  let result =  this.http.post<correoActivacion_interface>(this.api_url,{Destinatario})
  return result;
}
}