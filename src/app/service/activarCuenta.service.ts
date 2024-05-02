import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { activarCuenta_Interface } from '../models/activarCuenta.model';

@Injectable({
    providedIn: 'root'
})
export class activarCuentaService {
    api_url= environment.url_api + 'cuentas/activarCuenta/'
    // api_url = 'http://localhost:80/cuentas/activarCuenta/'
    
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    })

    option = { headers: this.headers }

    activarCuenta(identificador: string, numero_activacion: string): Observable<activarCuenta_Interface> {
        let result = this.http.patch<activarCuenta_Interface>(this.api_url + identificador, { numero_activacion });
        return result;
    }

    // nuevaContrasena(identificador: string, contraseña: string, codigo: string): Observable<nuevaContrasena_Interface>{
    //     let result =  this.http.patch<nuevaContrasena_Interface>(this.api_url+identificador,{ contraseña, codigo})
    //     return result;

}
