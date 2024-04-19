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

  constructor(    private router: Router,
    private contraseñaservice : nuevaContrasenaService,
    private cache : CacheService,
  ) {}
  contrasenaLlena: boolean = true;
  confirmarcontrasenaLlena: boolean = true;

  Contrasena: string = '';
  ConfirmarContrasena: string= '';

  objeto: nuevaContrasena_Interface={
    nuevaContrasena: '',
    codigo: ''
  }

  actualizarContrasena(event : Event): void{
    this.Contrasena= (event.target as HTMLInputElement).value;
    this.contrasenaLlena = this.Contrasena.trim().length > 0;

  }
  actualizarConfirmarContrasena(event : Event): void{
    this.ConfirmarContrasena= (event.target as HTMLInputElement).value;
    this.confirmarcontrasenaLlena = this.ConfirmarContrasena.trim().length > 0;

  }

  almacenarDatos() {
    this.Contrasena = this.Contrasena;
    this.ConfirmarContrasena=this.ConfirmarContrasena;
    console.log(this.Contrasena, this.ConfirmarContrasena)
  }
  
  revisarContrasena(){
    let tamaño= this.Contrasena.length;
    if(tamaño == 0) {
      return false;
    }else{
      return true;
    }
  }
  revisarConfirmarContrasena(){
    let tamaño= this.ConfirmarContrasena.length;
    if(tamaño == 0) {
      return false;
    }else{
      return true;
    }
  }

  mostrarOcultarContrasena() {
    const contraseñaInput = document.getElementById("contrasena") as HTMLInputElement;
    const botón = document.querySelector(".password-input button") as HTMLButtonElement;

    if (contraseñaInput.type === "password") {
      contraseñaInput.type = "text";
      botón.textContent = "Ocultar";
    } else {
      contraseñaInput.type = "password";
      botón.textContent = "Mostrar";
    }
  }
  mostrarContrasena: boolean = false;

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  mostrarOcultarContrasena2() {
    const contraseñaInput = document.getElementById("ConfirmarContrasena") as HTMLInputElement;

    if (contraseñaInput.type === "password") {
      contraseñaInput.type = "text";
    } else {
      contraseñaInput.type = "password";
    }
  }
  mostrarContrasena2: boolean = false;

  toggleMostrarContrasena2() {
    this.mostrarContrasena2 = !this.mostrarContrasena2;
  }
  async guardarContrasena(){
    let contrasenallena= this.revisarContrasena();
    if( contrasenallena==false){
        this.contrasenaLlena= false;
    }
    let confirmarcontrasenallena= this.revisarContrasena();
    if( confirmarcontrasenallena==false){
        this.confirmarcontrasenaLlena= false;
    }

    if(contrasenallena==true && confirmarcontrasenallena==true){
      let actualizarContrasena: any= await this.contraseñaservice.nuevaContrasena(this.cache.obtenerDatoLocal('cuenta'), this.Contrasena, this.cache.obtenerDatoLocal('codigo')).toPromise();
      console.log(actualizarContrasena.status);
    }
    //this.router.navigate(['/login'])


this.almacenarDatos();
  }
}
