import { NgModule } from '@angular/core';
 import {MatDialogModule} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableauComponent } from './shared/tableau/tableau.component';
import { AbsenceTabUtilisateurComponent } from './pages/absence-tab-utilisateur/absence-tab-utilisateur.component';
import { RttTabManagerComponent } from './pages/rtt-tab-manager/rtt-tab-manager.component';
import { ModalModifJFComponent } from './shared/modal-modif-jf/modal-modif-jf.component';
import { ModalCreationRttComponent } from './shared/modal-creation-rtt/modal-creation-rtt.component';
import { AbsencesManagerComponent } from './pages/absences-manager/absences-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TableauComponent,
    AbsenceTabUtilisateurComponent,
    RttTabManagerComponent,
    ModalModifJFComponent,
    ModalCreationRttComponent,
    AbsencesManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
