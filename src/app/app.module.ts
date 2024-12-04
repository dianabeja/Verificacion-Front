import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './view/landing/landing.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NewpassComponent } from './view/newpass/newpass.component';
import { CodigoverificacionComponent } from './view/codigoverificacion/codigoverificacion.component';
import { NuevacontrasenaComponent } from './view/nuevacontrasena/nuevacontrasena.component';
import { RegisterComponent } from './view/register/register.component';
import { ActivarCuentaComponent } from './view/code/code.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCcAmex, faCcMastercard, faCcPaypal, faCcVisa, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { VuelodetallesComponent } from './view/vuelodetalles/vuelodetalles.component';
import { ReserveComponent } from './view/reserve/reserve.component';
import { PassengerFormComponent } from './view/passenger-form/passenger-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivarCuentaComponent,
    NewpassComponent,
    CodigoverificacionComponent,
    NuevacontrasenaComponent,
    LandingComponent,
    VuelodetallesComponent,
    ReserveComponent,
    PassengerFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule, // Agrega BrowserAnimationsModule a los imports
    ToastrModule.forRoot(), // Agrega ToastrModule.forRoot() a los imports
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookF, faTwitter, faInstagram, faCcVisa, faCcMastercard, faCcAmex, faCcPaypal);
  }
}
