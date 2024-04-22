import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private router: Router) {} 
  

  redireccionar(): void {
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidosInput = document.getElementById('apellidos') as HTMLInputElement;
    const edadInput = document.getElementById('edad') as HTMLInputElement;
    const telefonoInput = document.getElementById('telefono') as HTMLInputElement;

    if (!nombreInput.value || !apellidosInput.value || !edadInput.value || !telefonoInput.value) {
      alert('Por favor, completa todos los campos.');
      return; 
    }

    console.log('Registro exitoso. Redireccionando...');
    this.router.navigate(['/code']); 
  }

}
