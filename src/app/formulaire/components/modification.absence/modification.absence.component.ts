import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Absence } from 'src/app/models/absence';
import { StatusAbsence } from 'src/app/models/status-absence';
import { TypeConge } from 'src/app/models/type-conge';
import { AbsenceUtilTabService } from 'src/app/pages/absence-tab-utilisateur/providers/absence-util-tab.service';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Component({
  selector: 'app-modification.absence',
  templateUrl: './modification.absence.component.html',
  styleUrls: ['./modification.absence.component.scss'],
})
export class ModificationAbsenceComponent implements OnInit {
  @Input() absence!: Partial<Absence>;
  @Input() dateDebut!: Date;
  @Input() dateFin!: Date;
  @Input() typeConge!: TypeConge;
  @Input() motif!: string;
  @Input() status!: StatusAbsence;

  formValid: string = '';
  formError: string = '';
  submitted: boolean = false;

  @Input() entity!: Absence;
  @Input() absenceSubscription?: Subscription;

  form: FormGroup = new FormGroup({
    dateDebut: new FormControl(this.dateDebut),
    dateFin: new FormControl(this.dateFin),
    typeConge: new FormControl(this.typeConge),
    motif: new FormControl(this.motif),
    status: new FormControl(this.status),
  });

  entities: Absence[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Absence,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _absenceHttpService: AbsenceHttpService
  ) {
    this.form = this.fb.group({
      dateDebut: this.data.dateDebut,
      dateFin: this.data.dateFin,
      typeConge: this.data.typeConge,
      motif: this.data.motif,
      status: this.data.status,
    });
  }

  ngOnInit() {
    this.onSubmit;
  }

  onAnnulation() {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.submitted = true;

    if (
      this.data.status === StatusAbsence.VALIDEE ||
      this.data.status === StatusAbsence.ATTENTE_VALIDATION
    ) {
      this.formError =
        "Votre demande d'absence a déjà été validée ou prise en compte par le traitement de nuit";
    }

    this.absence = {
      dateDebut: this.getDateDebut?.value,
      dateFin: this.getDateFin?.value,
      typeConge: this.getTypeConge?.value,
      motif: this.getMotif?.value,
      status: this.getStatus?.value,
    };

    if (this.form.valid) {
      this._absenceHttpService
        .putByid(`${this.data.id}`, this.absence)
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

  get getEmail() {
    return this.form.get('email');
  }
}
