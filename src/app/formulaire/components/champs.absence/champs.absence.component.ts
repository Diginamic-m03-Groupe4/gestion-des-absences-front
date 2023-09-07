import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatusAbsence } from 'src/app/models/status-absence';
import { TypeConge } from 'src/app/models/type-conge';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.absence.component.html',
  styleUrls: ['./champs.absence.component.scss'],
})
export class ChampsAbsenceComponent {
   dateDebut!: Date;
   dateFin!: Date;
   typeConge!: TypeConge;
   motif: string = "ajouter votre motif si c'est un congé sans solde";
   status!: StatusAbsence;

}
