import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { AbsenceTabUtilisateurComponent } from './pages/absence-tab-utilisateur/absence-tab-utilisateur.component';
import { RttTabManagerComponent } from './pages/rtt-tab-manager/rtt-tab-manager.component';
import { FormulaireModule } from './formulaire/formulaire.module';
import { AbsencesManagerComponent } from './pages/absences-manager/absences-manager.component';
import { isLoggedInGuard, isManagerGuard } from './guards/is-logged-in.guard';
import { CalendarComponent } from './pages/calendar/calendar.component';

const routes: Routes = [
  {path : "absences", component : AbsenceTabUtilisateurComponent, canActivate : [isLoggedInGuard] },
  {path : "rtt-jf", component : RttTabManagerComponent, canActivate : [isLoggedInGuard]},
  {path : "absences-manager", component : AbsencesManagerComponent, canActivate : [isManagerGuard]},
  {path : "login", component : LoginComponent},
  {path : "signup", component : SignupComponent},
  {path : "", redirectTo : "login", pathMatch : "full"},
  {path : "calendar", component : CalendarComponent},
  {path : "**", redirectTo : "login", pathMatch : "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormulaireModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
