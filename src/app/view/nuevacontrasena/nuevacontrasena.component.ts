import { Component } from '@angular/core';
import { nuevaContrasena_Interface } from 'src/app/models/nuevaContrasena.model';
import { Router } from '@angular/router';
import { nuevaContrasenaService } from 'src/app/service/nuevaContrasena.service';
import { CacheService } from 'src/app/service/cache.service';

@Component({
  selector: 'app-nuevacontrasena',
  templateUrl: './nuevacontrasena.component.html',
  styleUrls: ['./nuevacontrasena.component.css']
})
export class NuevacontrasenaComponent {

  constructor(
    private router: Router,
    private contraseñaservice: nuevaContrasenaService,
    private cache: CacheService
  ) {}

  contrasenaLlena: boolean = true;
  confirmarcontrasenaLlena: boolean = true;
  contrasenasCoinciden: boolean = true;

  Contrasena: string = '';
  ConfirmarContrasena: string = '';

  mensajeError: string = '';

  mostrarContrasena: boolean = false;
  mostrarContrasena2: boolean = false;

  objeto: nuevaContrasena_Interface = {
    nuevaContrasena: '',
    codigo: ''
  }

  actualizarContrasena(event: Event): void {
    this.Contrasena = (event.target as HTMLInputElement).value;
    this.contrasenaLlena = this.Contrasena.trim().length >= 8;
    this.validarCoincidencia();
  }

  actualizarConfirmarContrasena(event: Event): void {
    this.ConfirmarContrasena = (event.target as HTMLInputElement).value;
    this.confirmarcontrasenaLlena = this.ConfirmarContrasena.trim().length >= 8;
    this.validarCoincidencia();
  }

  almacenarDatos() {
    this.Contrasena = this.Contrasena;
    this.ConfirmarContrasena = this.ConfirmarContrasena;
  }

  revisarContrasena(): boolean {
    return this.Contrasena.trim().length >= 8;
  }

  revisarConfirmarContrasena(): boolean {
    return this.ConfirmarContrasena.trim().length >= 8;
  }

  validarCoincidencia(): void {
    this.contrasenasCoinciden = this.Contrasena === this.ConfirmarContrasena;
  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleMostrarContrasena2() {
    this.mostrarContrasena2 = !this.mostrarContrasena2;
  }

  async guardarContrasena() {
    const contrasenallena = this.revisarContrasena();
    const confirmarcontrasenallena = this.revisarConfirmarContrasena();
    this.validarCoincidencia();

    if (!contrasenallena|| !confirmarcontrasenallena) {
      this.contrasenaLlena = false;
      this.mensajeError = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!this.contrasenasCoinciden) {
      this.mensajeError = 'Las contraseñas no coinciden.';
    }

    if (contrasenallena && confirmarcontrasenallena && this.contrasenasCoinciden) {
      this.almacenarDatos();
      await this.contraseñaservice.nuevaContrasena(
        this.cache.obtenerDatoLocal('cuenta'),
        this.Contrasena,
        this.cache.obtenerDatoLocal('codigo')
      ).toPromise();
      this.router.navigate(['/login']);
    }
  }
}
