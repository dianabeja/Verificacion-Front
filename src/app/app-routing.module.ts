import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { NewpassComponent } from './view/newpass/newpass.component';
import { CodigoverificacionComponent } from './view/codigoverificacion/codigoverificacion.component';
import { NuevacontrasenaComponent } from './view/nuevacontrasena/nuevacontrasena.component';
import { RegisterComponent } from './view/register/register.component';
import { ActivarCuentaComponent } from './view/code/code.component';
import { LandingComponent } from './view/landing/landing.component';
import { ReserveComponent } from './view/reserve/reserve.component';
import { PassengerFormComponent } from './view/passenger-form/passenger-form.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'code', component: ActivarCuentaComponent },
  { path: 'newPass', component: NewpassComponent },
  { path: 'codVerificacion', component: CodigoverificacionComponent },
  { path: 'nuevaContrasena', component: NuevacontrasenaComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'reserve', component: ReserveComponent},
  { path: 'passenger-form', component: PassengerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
