import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { NewpassComponent } from './view/newpass/newpass.component';
import { CodigoverificacionComponent } from './view/codigoverificacion/codigoverificacion.component';
import { NuevacontrasenaComponent } from './view/nuevacontrasena/nuevacontrasena.component';
import { RegisterComponent } from './view/register/register.component';
import { ActivarCuentaComponent } from './view/code/code.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'code', component: ActivarCuentaComponent },
  { path: 'newPass', component: NewpassComponent },
  { path: 'codVerificacion', component: CodigoverificacionComponent },
  { path: 'nuevaContrasena', component: NuevacontrasenaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
