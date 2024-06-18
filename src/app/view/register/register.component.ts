import { Component } from '@angular/core';
import { register_interface } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/service/register.service';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/service/cache.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private registerservice: RegisterService,
    private cache: CacheService,
    private router: Router
  ) { }

  Identificador: string = '';
  Contrasena: string = '';
  Nombre: string = '';
  Apellidos: string = '';
  Edad: number = 0;
  TarjetaTitular: string = '';
  TarjetaDireccion: string = '';
  NumeroTarjeta: string = '';
  FechaVencimiento: string = '';
  identificadorLleno: boolean = true;
  contrasenaLlena: boolean = true;
  nombreLleno: boolean = true;
  apellidosLleno: boolean = true;
  edadLleno: boolean = true;
  tarjetatitularLleno: boolean = true;
  tarjetadireccionLleno: boolean = true;
  numerotarjetaLleno: boolean = true;
  fechavencimientoLleno: boolean = true;
  mostrarConfirmacion = false;
  loading: boolean = false;
  form2Habilitado: boolean = false;

  register_object: register_interface = {
    identificador: '',
    contraseña: '',
    usuario_Nombre: '',
    usuario_Apellidos: '',
    usuario_Edad: 0,
    usuario_Tarjeta_Titular: '',
    usuario_Tarjeta_Direccion: '',
    usuario_Tarjeta_Numero_Tarjeta: '',
    usuario_Tarjeta_Fecha_Vencimiento: ''
  };

  activarForm2(event: any): void {
    this.form2Habilitado = event.target.checked;
  }

  actualizarIdentificador(event: Event): void {
    this.Identificador = (event.target as HTMLInputElement).value;
    this.identificadorLleno = this.Identificador.trim().length > 0;
  }

  actualizarContrasena(event: Event): void {
    this.Contrasena = (event.target as HTMLInputElement).value;
    this.contrasenaLlena = this.Contrasena.trim().length > 0;
  }

  actualizarNombre(event: Event): void {
    this.Nombre = (event.target as HTMLInputElement).value;
    this.nombreLleno = this.Nombre.trim().length > 0;
  }

  actualizarApellidos(event: Event): void {
    this.Apellidos = (event.target as HTMLInputElement).value;
    this.apellidosLleno = this.Apellidos.trim().length > 0;
  }

  actualizarEdad(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.Edad = Number(inputElement.value);
    this.edadLleno = this.Edad.toString().trim().length > 0;
  }

  actualizarTarjetaTitular(event: Event): void {
    this.TarjetaTitular = (event.target as HTMLInputElement).value;
    this.tarjetatitularLleno = this.TarjetaTitular.trim().length > 0;
  }

  actualizarTarjetaDireccion(event: Event): void {
    this.TarjetaDireccion = (event.target as HTMLInputElement).value;
    this.tarjetadireccionLleno = this.TarjetaDireccion.trim().length > 0;
  }

  actualizarNumeroTarjeta(event: Event): void {
    this.NumeroTarjeta = (event.target as HTMLInputElement).value;
    this.numerotarjetaLleno = this.NumeroTarjeta.trim().length > 0;
  }

  actualizarFechaVencimiento(event: Event): void {
    this.FechaVencimiento = (event.target as HTMLInputElement).value;
    this.fechavencimientoLleno = this.FechaVencimiento.trim().length > 0;
  }

  private validarNumeroTarjeta(numeroTarjeta: string): boolean {
    const regex = /^[0-9]{16}$/; // Ejemplo para validar un número de tarjeta de 16 dígitos
    return regex.test(numeroTarjeta);
  }

  private validarFechaVencimiento(fechaVencimiento: string): boolean {
    const regex = /^(0[1-9]|1[0-2])-[0-9]{2}$/; // Ejemplo para MM-YY
    return regex.test(fechaVencimiento);
  }

  private validarEdad(edad: string): boolean {
    const regex = /^(1[89]|[2-9][0-9]|1[01][0-9]|120)$/; // Rango de 18 a 120 años
    return regex.test(edad);
  }

  private validarCorreoElectronico(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  }

  private validarContrasena(contrasena: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    return regex.test(contrasena);
  }
  
  

  almacenarDatos() {
    this.register_object.identificador = this.Identificador;
    this.register_object.contraseña = this.Contrasena;
    this.register_object.usuario_Nombre = this.Nombre;
    this.register_object.usuario_Apellidos = this.Apellidos;
    this.register_object.usuario_Edad = this.Edad;
    this.register_object.usuario_Tarjeta_Titular = this.TarjetaTitular;
    this.register_object.usuario_Tarjeta_Direccion = this.TarjetaDireccion;
    this.register_object.usuario_Tarjeta_Numero_Tarjeta = this.NumeroTarjeta;
    this.register_object.usuario_Tarjeta_Fecha_Vencimiento = this.FechaVencimiento;
  }

  async registrarUsuario() {
    this.loading = true;

    if (!this.Nombre || !this.Apellidos || !this.Edad || !this.Identificador || !this.Contrasena) {
      alert('Por favor, complete los campos de Nombre, Apellidos, Edad, Identificador y Contraseña.');
      this.loading = false;
      return;
    }

    if (this.form2Habilitado) {
      if (!this.TarjetaTitular || !this.TarjetaDireccion || !this.NumeroTarjeta || !this.FechaVencimiento) {
        alert('Por favor, complete los campos de Nombre del titular, Direccion de facturacion, Numero de tarjeta y Fecha de vencimiento.');
        this.loading = false;
        return;
      }

      if (!this.validarNumeroTarjeta(this.NumeroTarjeta)) {
        alert('Número de tarjeta inválido. Debe tener 16 dígitos numericos.');
        this.loading = false;
        return;
      }

      if (!this.validarFechaVencimiento(this.FechaVencimiento)) {
        alert('Fecha de vencimiento inválida. Formato MM-YY.');
        this.loading = false;
        return;
      }

    }

    if (!this.TarjetaTitular || !this.TarjetaDireccion || !this.NumeroTarjeta || !this.FechaVencimiento) {
      const confirmacion = window.confirm('¿Desea dejar los campos de la tarjeta vacíos?');
      if (confirmacion) {
        try {

          if (!this.validarEdad(this.Edad.toString())) {
            alert('Edad inválida. Debe ser mayor o igual a 18 años y menor o igual a 120 años.');
            this.loading = false;
            return;
          }

          if (!this.validarCorreoElectronico(this.Identificador)) {
            alert('Correo electrónico inválido.');
            this.loading = false;
            return;
          }

          if(!this.validarContrasena(this.Contrasena)) {
            alert('Contraseña inválida. Debe tener entre 8 y 20 caracteres, al menos una letra minúscula, una letra mayúscula y un número.');
            this.loading = false;
            return;
          }

          await this.almacenarDatos();
          let a = await this.registerservice
            .register(this.register_object.identificador, this.register_object.contraseña, this.register_object.usuario_Nombre, this.register_object.usuario_Apellidos, this.register_object.usuario_Edad, this.register_object.usuario_Tarjeta_Titular, this.register_object.usuario_Tarjeta_Direccion, this.register_object.usuario_Tarjeta_Numero_Tarjeta, this.register_object.usuario_Tarjeta_Fecha_Vencimiento)
            .toPromise();
          this.router.navigate(['/code']);
          console.log(a);
          this.cache.guardarDatoLocal('cuenta', this.register_object.identificador);
        } catch (error) {
          this.mostrarError(error);
        } finally {
          this.loading = false;
        }
      } else {
        this.loading = false;
      }
    } else {
      try {
        await this.almacenarDatos();
        let a = await this.registerservice
          .register(this.register_object.identificador, this.register_object.contraseña, this.register_object.usuario_Nombre, this.register_object.usuario_Apellidos, this.register_object.usuario_Edad, this.register_object.usuario_Tarjeta_Titular, this.register_object.usuario_Tarjeta_Direccion, this.register_object.usuario_Tarjeta_Numero_Tarjeta, this.register_object.usuario_Tarjeta_Fecha_Vencimiento)
          .toPromise();
        this.router.navigate(['/code']);
        console.log(a);
        this.cache.guardarDatoLocal('cuenta', this.register_object.identificador);
      } catch (error) {
        this.mostrarError(error);
      } finally {
        this.loading = false;
      }
    }
  }

  private mostrarError(error: any) {
    let errorMessage = 'Unknown error!';
    if (error instanceof HttpErrorResponse) {
      // Error del lado del cliente o de red
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}\nDetails: ${JSON.stringify(error.error.message)}`;
      } else {
        // Error del lado del servidor
        if (error.error && typeof error.error === 'object') {
          // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nDetails: ${JSON.stringify(error.error)}`;
          errorMessage = `Error Code: ${error.status}\nDetails: ${JSON.stringify(error.error.message)}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nDetails: ${JSON.stringify(error.error.message)}`;
        }
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = JSON.stringify(error);
    }
    alert(errorMessage);
  }
  
}