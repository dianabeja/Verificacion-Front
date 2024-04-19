import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { validarCodigo_Interface } from '../models/validarCodigo.model';

@Injectable({
  providedIn: 'root'
})
export class validarCodigoService {
  api_url= environment.url_api + 'cuentas/validarCodigo'
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  option = {headers: this.headers}

  validarCodigo(identificador: string, codigo: string): Observable<validarCodigo_Interface>{
  let result =  this.http.post<validarCodigo_Interface>(this.api_url,{identificador, codigo})
  return result;
}
}
