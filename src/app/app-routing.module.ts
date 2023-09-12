import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { AbsenceTabUtilisateurComponent } from './pages/absence-tab-utilisateur/absence-tab-utilisateur.component';
import { RttTabManagerComponent } from './pages/rtt-tab-manager/rtt-tab-manager.component';
import { FormulaireModule } from './formulaire/formulaire.module';
import { AbsencesManagerComponent } from './pages/absences-manager/absences-manager.component';
import { isLoggedInGuard, isManagerGuard } from './guards/is-logged-in.guard';
import { CreationAbsenceComponent } from './formulaire/components/creation.absence/creation.absence.component';
import { ModificationAbsenceComponent } from './formulaire/components/modification.absence/modification.absence.component';
import { SuppressionAbsenceComponent } from './formulaire/components/suppression.absence/suppression.absence.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HistogramComponent } from './shared/histogram/histogram.component';

const routes: Routes = [
  { path: 'histogram', component: HistogramComponent },
  {path: 'calendar', component: CalendarComponent},
  {path: 'formulaire', component: CreationAbsenceComponent},
  {path: 'modification', component: ModificationAbsenceComponent},
  { path: 'suppression', component: SuppressionAbsenceComponent},
  {path : "absences", component : AbsenceTabUtilisateurComponent},
  {path : "rtt-jf", component : RttTabManagerComponent},
  {path : "absences-manager", component : AbsencesManagerComponent, canActivate : [isManagerGuard]},
  {path : "login", component : LoginComponent},
  {path : "signup", component : SignupComponent},
  {path : "", redirectTo : "login", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormulaireModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
