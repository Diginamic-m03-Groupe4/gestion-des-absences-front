import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Absence } from 'src/app/models/absence';
import { Router } from '@angular/router';
import { StatusAbsence } from 'src/app/models/status-absence';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';
import { TypeConge } from 'src/app/models/type-conge';

@Component({
  selector: 'app-creation.absence',
  templateUrl: './creation.absence.component.html',
  styleUrls: ['./creation.absence.component.scss'],
})
export class CreationAbsenceComponent implements OnInit {
  absence!: Absence;
  @Input() dateDebut!: Date;
  @Input() dateFin!: Date;
  @Input() typeConge!: TypeConge;
  @Input() motif: string = "ajouter votre motif si c'est un congé sans solde";

  formValid: string = '';
  formError: string = '';
  submitted: boolean = false;

  @Input() form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _absenceHttpService: AbsenceHttpService
  ) {
    this.form = this.fb.group({
      dateDebut: '',
      dateFin: '',
      typeConge: TypeConge.PAYE,
      motif: '',
    });
  }

  ngOnInit() {
    this.onSubmit;
}

  onSubmit() {
    this.submitted = true;
    this.absence.dateDebut = this.form.value.getDateDebut?.value;
    this.absence.dateFin = this.form.value.getDateFin?.value;
    this.absence.typeConge = this.form.value.getTypeConge?.value;
    this.absence.motif = this.form.value.getMotif?.value;

    if (this.absence.typeConge !== TypeConge.SANS_SOLDE) {
      this.absence.motif = '';
    }

    if (this.form.valid) {
      this._absenceHttpService.post(this.absence).subscribe(() => {
        next: () =>
          (this.formValid =
            'Votre demande de congés a bien été prise en compte');
        error: (err: { error: { message: string } }) => {
          this.formError = err.error.message;
        };
      });
    }
  }

  get getDateDebut() {
    return this.form.get('dateDebut');
  }

  get getDateFin() {
    return this.form.get('dateFin');
  }

  get getTypeConge() {
    return this.form.get('typeConge');
  }

  get getMotif() {
    return this.form.get('motif');
  }
}
