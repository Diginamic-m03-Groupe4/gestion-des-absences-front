import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Absence } from 'src/app/models/absence';
import { StatusAbsence } from 'src/app/models/status-absence';
import { TypeConge } from 'src/app/models/type-conge';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Component({
  selector: 'app-modification.absence',
  templateUrl: './modification.absence.component.html',
  styleUrls: ['./modification.absence.component.scss'],
})
export class ModificationAbsenceComponent {
  @Output() absence!: Absence;
  @Input() dateDebut!: Date;
  @Input() dateFin!: Date;
  @Input() typeConge!: TypeConge;
  @Input() motif!: string;
  @Input() status!: StatusAbsence;

  formValid: string = '';
  formError: string = '';
  submitted: boolean = false;

  @Input() form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _absenceHttpService: AbsenceHttpService
  ) {
    this.form = this.fb.group({
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      typeConge: this.typeConge,
      motif: this.motif,
      status: this.status,
    });
  }

  private onSubmit() {
    this.submitted = true;

    if (
      this.status === StatusAbsence.VALIDEE ||
      this.status === StatusAbsence.ATTENTE_VALIDATION
    ) {
      this.formError =
        "Votre demande d'absence a déjà été validée ou prise en compte par le traitement de nuit";
    }

    this.absence.id = this.form.value.getId?.value;
    this.absence.dateDebut = this.form.value.getDateDebut?.value;
    this.absence.dateFin = this.form.value.getDateFin?.value;
    this.absence.typeConge = this.form.value.getTypeConge?.value;
    this.absence.motif = this.form.value.getMotif?.value;

    if (this.form.valid) {
      this._absenceHttpService
        .putByid(`${this.absence.id}`, this.absence)
        .subscribe(() => {
          next: this.formValid = 'Votre demande de congés a bien été modifiée';
          error: (err: { error: { message: string } }) => {
            this.formError = err.error.message;
          };
        });
    }
  }

  get getId() {
    return this.form.get('id');
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

  get getStatus() {
    return this.form.get('status');
  }
}
