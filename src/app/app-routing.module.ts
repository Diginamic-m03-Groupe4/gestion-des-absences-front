import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { FormulaireModule } from './formulaire/formulaire.module';
import { CreationAbsenceComponent } from './formulaire/components/creation.absence/creation.absence.component';
import { ModificationAbsenceComponent } from './formulaire/components/modification.absence/modification.absence.component';
import { SuppressionAbsenceComponent } from './formulaire/components/suppression.absence/suppression.absence.component';

const routes: Routes = [
  {path: 'formulaire', component: CreationAbsenceComponent},
  {path: 'modification', component: ModificationAbsenceComponent},
  { path: 'suppression', component: SuppressionAbsenceComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [FormulaireModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
