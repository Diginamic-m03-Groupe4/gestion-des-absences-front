import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StatusAbsence } from 'src/app/models/status-absence';
import { TypeConge } from 'src/app/models/type-conge';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.absence.component.html',
  styleUrls: ['./champs.absence.component.scss']
})
export class ChampsAbsenceComponent {
  dateDebut!: Date;
  dateFin!: Date;
  typeConge!: TypeConge;
  motif: string = "ajouter votre motif si c'est un congé sans solde";
  status!: StatusAbsence;

  form: FormGroup = new FormGroup({
    dateDebut: new FormControl(this.dateDebut),
    dateFin: new FormControl(this.dateFin),
    typeConge: new FormControl(this.typeConge),
    motif: new FormControl(this.motif),
    status: new FormControl(this.status),
  });

}
