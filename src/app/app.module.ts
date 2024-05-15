import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NewpassComponent } from './view/newpass/newpass.component';
import { CodigoverificacionComponent } from './view/codigoverificacion/codigoverificacion.component';
import { NuevacontrasenaComponent } from './view/nuevacontrasena/nuevacontrasena.component';
import { RegisterComponent } from './view/register/register.component';
import { ActivarCuentaComponent } from './view/code/code.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivarCuentaComponent,
    NewpassComponent,
    CodigoverificacionComponent,
    NuevacontrasenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, // Agrega BrowserAnimationsModule a los imports
    ToastrModule.forRoot() // Agrega ToastrModule.forRoot() a los imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
