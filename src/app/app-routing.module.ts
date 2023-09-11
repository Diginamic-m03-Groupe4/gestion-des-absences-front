import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path : "signup", component : SignupComponent},
  {path : "", redirectTo : "login", pathMatch : "full"},
  {path : "calendar", component : CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
