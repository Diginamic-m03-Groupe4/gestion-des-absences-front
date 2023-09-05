import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Absence } from 'src/app/models/absence';
import { StatusAbsence } from 'src/app/models/status-absence';
import { TypeConge } from 'src/app/models/type-conge';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Component({
  selector: 'app-suppression.absence',
  templateUrl: './suppression.absence.component.html',
  styleUrls: ['./suppression.absence.component.scss'],
})
export class SuppressionAbsenceComponent {
  absence!: Absence;
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
      typeCOnge: this.typeConge,
      motif: this.motif,
      status: this.status,
    });
  }

  private onSubmit() {
    this.submitted = true;

    this.absence.id = this.form.value.getId?.value;

    if(this.status === StatusAbsence.VALIDEE || this.status === StatusAbsence.ATTENTE_VALIDATION) {
      this.formError = "Vous ne pouvez plus supprimer une demande d'absence validée ou en cours de traitement";
}

    if (this.form.valid) {
      this._absenceHttpService
        .deleteByid(`${this.absence.id}`)
        .subscribe(() => {
          next: this.formValid = 'Votre demande de congés a bien été supprimée';
          error: (err: { error: { message: string } }) => {
            this.formError = err.error.message;
          };
        });
    }
  }

  get getId() {
    return this.form.get('id');
}
}
