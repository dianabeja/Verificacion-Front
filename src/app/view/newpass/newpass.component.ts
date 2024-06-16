import { Component } from '@angular/core';
import { CorreoService } from 'src/app/service/correo.service';
import { correo_interface } from 'src/app/models/correo.model';
import { CacheService } from 'src/app/service/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css'],
})
export class NewpassComponent {
  constructor(
    private correoservice: CorreoService,
    private cache: CacheService,
    private router: Router
  ) {}

  identificadorLleno: boolean = true;
  correoValido: boolean = true;

  Identificador: correo_interface = {
    Destinatario: '',
  };

  Destinatario = '';

  actualizarIdentificador(event: Event): void {
    this.Identificador.Destinatario = (event.target as HTMLInputElement).value;
    this.identificadorLleno = this.Identificador.Destinatario.trim().length > 0;
    this.correoValido = this.validarCorreo(this.Identificador.Destinatario);
  }

  almacenarDatos() {
    this.Destinatario = this.Identificador.Destinatario;
  }

  revisarCorreo() {
    let tamaño = this.Identificador.Destinatario.length;
    if (tamaño == 0) {
      return false;
    } else {
      return true;
    }
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  async enviarCorreo() {
    let correolleno = this.revisarCorreo();
    this.correoValido = this.validarCorreo(this.Identificador.Destinatario);

    if (!correolleno || !this.correoValido) {
      this.identificadorLleno = false;
      return;
    } else {
      this.identificadorLleno = true;
    }

    if (correolleno && this.correoValido) {
      this.almacenarDatos();
      this.cache.guardarDatoLocal('cuenta', this.Destinatario);
      let a = await this.correoservice.correo(this.Destinatario).toPromise();
      this.router.navigate(['/codVerificacion']);
    }
  }
}
