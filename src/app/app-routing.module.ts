import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { AbsenceTabUtilisateurComponent } from './pages/absence-tab-utilisateur/absence-tab-utilisateur.component';
import { RttTabManagerComponent } from './pages/rtt-tab-manager/rtt-tab-manager.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path : "signup", component : SignupComponent},
  {path : "absences", component : AbsenceTabUtilisateurComponent},
  {path : "rtt-jf", component : RttTabManagerComponent},
  {path : "", redirectTo : "login", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
