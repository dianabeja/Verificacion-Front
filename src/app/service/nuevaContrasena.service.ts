import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { nuevaContrasena_Interface } from '../models/nuevaContrasena.model';

@Injectable({
  providedIn: 'root'
})
export class nuevaContrasenaService {
  api_url= environment.url_api + 'cuentas/actualizarContrasena/'
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  option = {headers: this.headers}

  nuevaContrasena(identificador: string, contraseña: string, codigo: string): Observable<nuevaContrasena_Interface>{
  let result =  this.http.patch<nuevaContrasena_Interface>(this.api_url+identificador,{ contraseña, codigo})
  return result;
}
}
