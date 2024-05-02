import { Component } from '@angular/core';
import { validarCodigo_Interface } from 'src/app/models/validarCodigo.model';
import { validarCodigoService } from 'src/app/service/validarCodigo.service';
import { CacheService } from 'src/app/service/cache.service';
import { Router } from '@angular/router';
import { CorreoActivacionService } from 'src/app/service/correoActivacion.service';
import { activarCuenta_Interface } from 'src/app/models/activarCuenta.model';
import { activarCuentaService } from 'src/app/service/activarCuenta.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class ActivarCuentaComponent {
  constructor(
    private activarCuenta: activarCuentaService,
    private cache: CacheService,
    private router: Router,
    private reenviarcorreo: CorreoActivacionService,
  ) { }


  numero_activacion1: string = '';
  numero_activacion: any = [];
  mensaje: string = '';
  activar: boolean = false;

  Input: activarCuenta_Interface = {
    // identificador: '',
    numero_activacion: ''
  };

  estructura_Codigo() {
    this.Input.numero_activacion = `${this.numero_activacion[0]}${this.numero_activacion[1]}${this.numero_activacion[2]}-${this.numero_activacion[3]}${this.numero_activacion[4]}${this.numero_activacion[5]}-${this.numero_activacion[6]}${this.numero_activacion[7]}${this.numero_activacion[8]}`
  }


  actualizarCodigo1(event: Event): void {
    this.numero_activacion[0] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo2(event: Event): void {
    this.numero_activacion[1] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo3(event: Event): void {
    this.numero_activacion[2] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo4(event: Event): void {
    this.numero_activacion[3] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo5(event: Event): void {
    this.numero_activacion[4] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo6(event: Event): void {
    this.numero_activacion[5] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo7(event: Event): void {
    this.numero_activacion[6] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo8(event: Event): void {
    this.numero_activacion[7] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo9(event: Event): void {
    this.numero_activacion[8] = (event.target as HTMLInputElement).value;
  }

  async reenviarCorreo() {
    this.mensaje = "Validando .... :)"
    this.activar = true;
    let correo: any = await this.reenviarcorreo.correoActivacion(this.cache.obtenerDatoLocal('cuenta')).toPromise();
    console.log(correo)
    if (correo.status == 201) {
      this.mensaje = correo.message;
      this.activar = true;
    } else {
      this.mensaje = correo.message;
    }
  }

  async confirmarCodigo() {
    if (
      this.numero_activacion[0] &&
      this.numero_activacion[1] &&
      this.numero_activacion[2] &&
      this.numero_activacion[3] &&
      this.numero_activacion[4] &&
      this.numero_activacion[5] &&
      this.numero_activacion[6] &&
      this.numero_activacion[7] &&
      this.numero_activacion[8]
    ) {
  
      this.mensaje = "Validando .... :)"
      console.log("Validando .... :")
      this.activar = true;
      // this.Input.identificador= await this.cache.obtenerDatoLocal('cuenta');
      console.log(this.cache.obtenerDatoLocal('cuenta'))
      this.estructura_Codigo(); // No se necesita await aquí
      console.log(this.Input.numero_activacion) // Utiliza la propiedad ya actualizada
  
      try {
        let resutado: any = await this.activarCuenta.activarCuenta(this.cache.obtenerDatoLocal('cuenta'), this.Input.numero_activacion).toPromise();
        console.log(resutado)
        // this.cache.guardarDatoLocal('numero_activacion', this.Input.numero_activacion);
  
        if (resutado.status == 201) {
          this.cache.guardarDatoLocal('numero_activacion', this.Input.numero_activacion);
          this.router.navigate(['/login']);
          this.activar = false;
          console.log("creado")
  
        } else {
  
          this.mensaje = resutado.message;
          this.activar = true;
          console.log("error")
          window.alert("Error al activar la cuenta");
        }
      } catch (error) {
        console.error(error);
        this.mensaje = "Error al activar la cuenta";
        this.activar = true;
      }
  
    } else {
      this.mensaje = "Por favor complete todos los campos";
      console.log("Por favor complete todos los campos")
      this.activar = true;
    }
  }
  
}