import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationAbsenceComponent } from './components/creation.absence/creation.absence.component';
import { ModificationAbsenceComponent } from './components/modification.absence/modification.absence.component';
import { SuppressionAbsenceComponent } from './components/suppression.absence/suppression.absence.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChampsAbsenceComponent } from './components/champs.absence/champs.absence.component';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  declarations: [
    CreationAbsenceComponent,
    ModificationAbsenceComponent,
    SuppressionAbsenceComponent,
    ChampsAbsenceComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class FormulaireModule { }
