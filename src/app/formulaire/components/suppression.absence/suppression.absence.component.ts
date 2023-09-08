import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Absence } from 'src/app/models/absence';
import { AbsenceUtilTabService } from 'src/app/pages/absence-tab-utilisateur/providers/absence-util-tab.service';

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
    private service : AbsenceUtilTabService
  ) {
  }

  ngOnInit() {
    this.onSubmit;
  }

  cancel() {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.service.httpService
    .deleteByid(`${this.data.id}`)
    .subscribe(() => {
        console.log(`Suppression de l'absence ${this.data.id}`);
        this.service.getAbsences(this.service.annee)
        this.dialog.closeAll()
    });
  }
}

