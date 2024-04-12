import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { login_interface } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api_url= environment.url_api + 'auth/login'
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  option = {headers: this.headers}

  login(identificador: string, contraseña: string): Observable<login_interface>{
  let result =  this.http.post<login_interface>(this.api_url,{identificador, contraseña})
  return result;
}
}
