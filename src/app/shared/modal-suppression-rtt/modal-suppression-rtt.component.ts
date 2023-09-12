import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { RttServiceService } from 'src/app/pages/rtt-tab-manager/providers/rtt-service.service';

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
    private service : RttServiceService
  ) {}


  cancel() {
    this.dialog.closeAll();
  }

  onSubmit() {
    this.service.httpService
    .deleteByid(`${this.data.id}`)
    .subscribe(({
      next : () => {
        this.service.httpService.get(this.service.annee).subscribe(value => {
          this.service.shownRtt = value
          this.service.getEntitiesSubject().next(this.service.shownRtt)
          this.dialog.closeAll()
        })
      },
      error : (error) => {
        this.errorMessage = error.error.message
      }

    }));
  }
}
