import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Absence } from 'src/app/models/absence';
import { StatusAbsence } from 'src/app/models/status-absence';
import { TypeConge } from 'src/app/models/type-conge';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Component({
  selector: 'app-suppression.absence',
  templateUrl: './suppression.absence.component.html',
  styleUrls: ['./suppression.absence.component.scss'],
})
export class SuppressionAbsenceComponent implements OnInit {
  absence!: Partial<Absence>;
  id!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public  data: Absence,
    private dialog: MatDialog,
    private _absenceHttpService: AbsenceHttpService
  ) {
  }

  ngOnInit() {
    this.onSubmit;
}

cancel() {
  this.dialog.closeAll();
}

  onSubmit() {
      this._absenceHttpService
        .deleteByid(`${this.data.id}`)
        .subscribe(() => {
          next: this.dialog.closeAll()
          error: (err: { error: { message: string } }) => {
            console.log(``,err.error.message);
          };
        });
    }
  }
