import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './view/register/register.component';
import { LoginComponent } from './view/login/login.component';
import { CardComponent } from './view/card/card.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'card', component: CardComponent },
  { path: 'verification', component: VerificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
