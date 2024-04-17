import { Component } from '@angular/core';
import { login_interface } from 'src/app/models/login.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginservice: LoginService){

  }

  correo: string = '';
  Identificador: string = '';
  Contrasena: string = '';

  login_object : login_interface = {
    identificador: '',
    contraseña: '',
  }

  actualizarIdentificador(event : Event): void{
    this.Identificador= (event.target as HTMLInputElement).value;
  }
  actualizarContrasena(event : Event): void{
    this.Contrasena= (event.target as HTMLInputElement).value;
  }

  almacenarDatos() {
    this.login_object.identificador = this.Identificador;
    this.login_object.contraseña = this.Contrasena;
  }

  async iniciarSesion(){
    await this.almacenarDatos();
    let a = await this.loginservice.login(this.login_object.identificador, this.login_object.contraseña).toPromise()
    console.log(a);
  }
}
