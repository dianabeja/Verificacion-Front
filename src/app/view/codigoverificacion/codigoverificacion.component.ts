import { Component } from '@angular/core';
import { validarCodigo_Interface } from 'src/app/models/validarCodigo.model';
import { validarCodigoService } from 'src/app/service/validarCodigo.service';
import { CacheService } from 'src/app/service/cache.service';
import { Router } from '@angular/router';
import { CorreoService } from 'src/app/service/correo.service';


@Component({
  selector: 'app-codigoverificacion',
  templateUrl: './codigoverificacion.component.html',
  styleUrls: ['./codigoverificacion.component.css']
})
export class CodigoverificacionComponent {

  constructor(
    private validarCodigo: validarCodigoService,
    private cache: CacheService,
    private router: Router,
    private reenviarcorreo: CorreoService,
  ) {}

  codigo1: string= '';
  codigo: any = [];
  mensaje: string='';
  activar: boolean= false;

  Input: validarCodigo_Interface = {
    identificador: '',
    codigo: ''
  };

  estructura_Codigo() {
    this.Input.codigo = `${this.codigo[0]}${this.codigo[1]}${this.codigo[2]}-${this.codigo[3]}${this.codigo[4]}${this.codigo[5]}`
  }


  actualizarCodigo1(event: Event): void {
    this.codigo[0] = (event.target as HTMLInputElement).value;
  }

  actualizarCodigo2(event: Event): void {
    this.codigo[1] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo3(event: Event): void {
    this.codigo[2] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo4(event: Event): void {
    this.codigo[3] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo5(event: Event): void {
    this.codigo[4] = (event.target as HTMLInputElement).value;
  }
  actualizarCodigo6(event: Event): void {
    this.codigo[5] = (event.target as HTMLInputElement).value;
  }

  async reenviarCorreo(){
    this.mensaje = "Validando .... :)"
    this.activar = true;
    let correo : any= await this.reenviarcorreo.correo(this.cache.obtenerDatoLocal('cuenta')).toPromise();
    console.log(correo)
    if (correo.status==201){
      this.mensaje=correo.message;
      this.activar=true;
    } else{
      this.mensaje=correo.message;

    }
  }

  async confirmarCodigo(){
    if (
      this.codigo[0] &&
      this.codigo[1] &&
      this.codigo[2] &&
      this.codigo[3] &&
      this.codigo[4] &&
      this.codigo[5]
    ) {

    this.mensaje = "Validando .... :)"
    this.activar = true;
    this.Input.identificador= await this.cache.obtenerDatoLocal('cuenta');
    await this.estructura_Codigo();
    let resutado: any = await this.validarCodigo.validarCodigo(this.Input.identificador, this.Input.codigo).toPromise();
   
    if(resutado.status==201){
      this.cache.guardarDatoLocal('codigo',this.Input.codigo);
      this.router.navigate(['/nuevaContrasena']);
      this.activar= false;
    }else {
      this.mensaje= resutado.message;
      this.activar= true;
    }
  }else{
    this.mensaje = "Por favor complete todos los campos";
    this.activar = true;
  }
}

}
