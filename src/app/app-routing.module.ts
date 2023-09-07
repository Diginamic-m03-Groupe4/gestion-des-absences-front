import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { AbsenceTabUtilisateurComponent } from './pages/absence-tab-utilisateur/absence-tab-utilisateur.component';
import { RttTabManagerComponent } from './pages/rtt-tab-manager/rtt-tab-manager.component';
import { AbsencesManagerComponent } from './pages/absences-manager/absences-manager.component';
import { isLoggedInGuard, isManagerGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {path : "login", component : LoginComponent, },
  {path : "signup", component : SignupComponent, },
  {path : "absences", component : AbsenceTabUtilisateurComponent, canActivate : [isLoggedInGuard]},
  {path : "rtt-jf", component : RttTabManagerComponent, canActivate : [isLoggedInGuard]},
  {path : "absences-manager", component : AbsencesManagerComponent, canActivate : [isManagerGuard]},
  {path : "", redirectTo : "login", pathMatch : "full"},
  {path : "**", redirectTo : "login", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
