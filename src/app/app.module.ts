import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/authentication/login/login.component';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableauComponent } from './shared/tableau/tableau.component';
import { AbsenceTabUtilisateurComponent } from './pages/absence-tab-utilisateur/absence-tab-utilisateur.component';
import { RttTabManagerComponent } from './pages/rtt-tab-manager/rtt-tab-manager.component';
import { AbsencesManagerComponent } from './pages/absences-manager/absences-manager.component';
import { ModalValidationAbsenceComponent } from './shared/modal-validation-absence/modal-validation-absence.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalCreationRttComponent } from './shared/modal-creation-rtt/modal-creation-rtt.component';
import { ModalModifJFComponent } from './shared/modal-modif-jf/modal-modif-jf.component';
import { ModalModifRTTComponent } from './shared/modal-modif-rtt/modal-modif-rtt.component';
import { ModalSuppressionRttComponent } from './shared/modal-suppression-rtt/modal-suppression-rtt.component';
import { HistogramComponent } from './shared/histogram/histogram.component';
// import {
//   IgxDataChartCoreModule,
//   IgxDataChartCategoryModule,
//   IgxDataChartInteractivityModule,
//   IgxLegendModule,
//   IgxDataChartStackedModule,
//   IgxStackedFragmentSeriesModule,
// } from 'igniteui-angular-charts';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

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
    ModalValidationAbsenceComponent,
    NavbarComponent,
    SignupComponent,
    CalendarComponent,
    ModalCreationRttComponent,
    ModalModifJFComponent,
    ModalModifRTTComponent,
    ModalSuppressionRttComponent,
    HistogramComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    // IgxDataChartCoreModule,
    // IgxDataChartCategoryModule,
    // IgxDataChartInteractivityModule,
    // IgxLegendModule,
    // IgxDataChartStackedModule,
    // IgxStackedFragmentSeriesModule,
      CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
