import { Component } from '@angular/core';
import { login_interface } from 'src/app/models/login.model';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginservice: LoginService,
    private router: Router,
  ) { }

  Identificador: string = '';
  Contrasena: string = '';
  mostrarContrasena: boolean = false;
  identificadorLleno: boolean = true;
  contrasenaLlena: boolean = true;

  login_object: login_interface = {
    identificador: '',
    contraseña: '',
  };

  actualizarIdentificador(event: Event): void {
    this.Identificador = (event.target as HTMLInputElement).value;
    this.identificadorLleno = this.Identificador.trim().length > 0;
  }
  
  actualizarContrasena(event: Event): void {
    this.Contrasena = (event.target as HTMLInputElement).value;
    this.contrasenaLlena = this.Contrasena.trim().length > 0;
  }

  almacenarDatos() {
    this.login_object.identificador = this.Identificador;
    this.login_object.contraseña = this.Contrasena;
  }

  revisarCorreo(){
    let tamaño= this.Identificador.length;
    if(tamaño == 0) {
      return false;
    }else{
      return true;
    }
  }

  revisarContrasena(){
    let tamaño= this.Contrasena.length;
    if(tamaño == 0) {
      return false;
    }else{
      return true;
    }
  }

  async iniciarSesion() {
    let correolleno= this.revisarCorreo();
    if( correolleno==false){
        this.identificadorLleno= false;
    }
    let contrasenallena= this.revisarContrasena();
    if( contrasenallena==false){
        this.contrasenaLlena= false;
    }
    if(correolleno== true &&contrasenallena== true){
      await this.almacenarDatos();
      let a = await this.loginservice
        .login(this.login_object.identificador, this.login_object.contraseña)
        .toPromise();
        this.router.navigate(['/'])
        console.log(a);
    }
  }

  mostrarOcultarContrasena() {
    const contraseñaInput = document.getElementById(
      'contrasena'
    ) as HTMLInputElement;

    if (contraseñaInput.type === 'password') {
      contraseñaInput.type = 'text';
    } else {
      contraseñaInput.type = 'password';
    }
  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
