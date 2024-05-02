import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { register_interface } from '../models/register.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  api_url= environment.url_api + 'auth/register'
  // api_url = 'http://localhost:80/auth/register';

  constructor(private http: HttpClient) { }

  register(identificador: string, contraseña: string, usuario_Nombre: string, usuario_Apellidos: string, usuario_Edad: number, usuario_Tarjeta_Titular: string, usuario_Tarjeta_Direccion: string, usuario_Tarjeta_Numero_Tarjeta: string, usuario_Tarjeta_Fecha_Vencimiento: string): Observable<register_interface> {
    let result = this.http.post<register_interface>(this.api_url, { identificador, contraseña, usuario_Nombre, usuario_Apellidos, usuario_Edad, usuario_Tarjeta_Titular, usuario_Tarjeta_Direccion, usuario_Tarjeta_Numero_Tarjeta, usuario_Tarjeta_Fecha_Vencimiento })
    return result;
  }
}


