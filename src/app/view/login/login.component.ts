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
  constructor(private loginservice: LoginService, private router: Router) {}

  Identificador: string = '';
  Contrasena: string = '';
  mostrarContrasena: boolean = false;
  identificadorLleno: boolean = true;
  contrasenaLlena: boolean = true;
  mensajeError: string = '';

  login_object: login_interface = {
    identificador: '',
    contraseña: '',
    access_Token:'',
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

  revisarCorreo() {
    return this.Identificador.trim().length > 0;
  }

  revisarContrasena() {
    return this.Contrasena.trim().length > 0;
  }

  async iniciarSesion() {
    this.identificadorLleno = this.revisarCorreo();
    this.contrasenaLlena = this.revisarContrasena();

    if (this.identificadorLleno && this.contrasenaLlena) {
      this.almacenarDatos();
      try {
        const response = await this.loginservice
          .login(this.login_object.identificador, this.login_object.contraseña)
          .toPromise();

        console.log('Response:', response);  // Imprime la respuesta en la consola

        // Guarda el token en el almacenamiento local
        if (response && response.access_Token) {
          localStorage.setItem('access_Token', response.access_Token);
        }

        // Redirige a la página principal
        this.router.navigate(['/']);
      } catch (error) {
        this.mensajeError = 'Usuario o contraseña inválidos';
        console.error(error);
      }
    }
  }

  mostrarOcultarContrasena() {
    const contraseñaInput = document.getElementById('contrasena') as HTMLInputElement;

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
