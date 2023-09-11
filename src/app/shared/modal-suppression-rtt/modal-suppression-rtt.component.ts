import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ErrorMessage } from 'src/app/models/error-message';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { RttTabService } from 'src/app/pages/rtt-tab-manager/providers/rtt-tab.service';

@Component({
  selector: 'app-modal-suppression-rtt',
  templateUrl: './modal-suppression-rtt.component.html',
  styleUrls: ['./modal-suppression-rtt.component.scss']
})
export class ModalSuppressionRttComponent {

  absence: Partial<RttEmployeur> = {};
  id!: string;
  errorMessage = ""

  constructor(
    @Inject(MAT_DIALOG_DATA) public  data: RttEmployeur,
    private dialog: MatDialog,
    private service : RttTabService
  ) {}


  cancel() {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.service.rttHttpService
    .deleteByid(`${this.data.id}`)
    .subscribe(({
      next : () => {
        console.log(`Suppression de l'absence ${this.data.id}`);
        this.service.getAbsences(this.service.annee)
        this.dialog.closeAll()
      },
      error : (error) => {
        this.errorMessage = error.error.message
      }

    }));
  }
}
