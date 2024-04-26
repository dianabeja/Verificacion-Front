import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NewpassComponent } from './view/newpass/newpass.component';
import { CodigoverificacionComponent } from './view/codigoverificacion/codigoverificacion.component';
import { NuevacontrasenaComponent } from './view/nuevacontrasena/nuevacontrasena.component';
import { RegisterComponent } from './view/register/register.component';
import { CardComponent } from './view/card/card.component';
import { CodeComponent } from './view/code/code.component';
import { LandingComponent } from './view/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewpassComponent,
    CodigoverificacionComponent,
    NuevacontrasenaComponent,
    RegisterComponent,
    CardComponent,
    CodeComponent,
    LandingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
