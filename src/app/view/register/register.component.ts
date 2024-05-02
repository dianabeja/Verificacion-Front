import { Component } from '@angular/core';
import { register_interface } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/service/register.service';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/service/cache.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private registerservice: RegisterService,
    private cache: CacheService,
    private router: Router,
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

    if (!this.TarjetaTitular || !this.TarjetaDireccion || !this.NumeroTarjeta || !this.FechaVencimiento) {
      const confirmacion = window.confirm('¿Desea dejar los campos de la tarjeta vacíos?');
      if (confirmacion) {
        // this.continuarRegistro();

        await this.almacenarDatos();
        let a = await this.registerservice
          .register(this.register_object.identificador, this.register_object.contraseña, this.register_object.usuario_Nombre, this.register_object.usuario_Apellidos, this.register_object.usuario_Edad, this.register_object.usuario_Tarjeta_Titular, this.register_object.usuario_Tarjeta_Direccion, this.register_object.usuario_Tarjeta_Numero_Tarjeta, this.register_object.usuario_Tarjeta_Fecha_Vencimiento)
          .toPromise();
        this.router.navigate(['/code'])
        console.log(a);
        this.cache.guardarDatoLocal('cuenta', this.register_object.identificador);
      }
    } else {
      // this.continuarRegistro();

      await this.almacenarDatos();
      let a = await this.registerservice
        .register(this.register_object.identificador, this.register_object.contraseña, this.register_object.usuario_Nombre, this.register_object.usuario_Apellidos, this.register_object.usuario_Edad, this.register_object.usuario_Tarjeta_Titular, this.register_object.usuario_Tarjeta_Direccion, this.register_object.usuario_Tarjeta_Numero_Tarjeta, this.register_object.usuario_Tarjeta_Fecha_Vencimiento)
        .toPromise();
      this.router.navigate(['/code'])
      console.log(a);
      this.cache.guardarDatoLocal('cuenta', this.register_object.identificador);


    }

  }

}
