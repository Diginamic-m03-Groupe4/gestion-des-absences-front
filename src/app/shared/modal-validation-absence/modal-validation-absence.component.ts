import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Absence } from 'src/app/models/absence';
import { AbsenceManagerService } from 'src/app/pages/absences-manager/providers/absence-manager.service';

@Component({
  selector: 'app-modal-validation-absence',
  templateUrl: './modal-validation-absence.component.html',
  styleUrls: ['./modal-validation-absence.component.scss']
})
export class ModalValidationAbsenceComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: Absence, private dialog : MatDialog, private service: AbsenceManagerService) { }

  onAnnulation(){
    this.dialog.closeAll()
  }

  onValidation(){
    this.service.absenceService.postDemandeValidatedId(this.data.id!).subscribe(()=>{
      this.service.employeeService.getByDepartement().subscribe(value => {
        this.service.entitiesSubject.next(value)
      })
    })
    this.dialog.closeAll()
  }

  onRejet(){
    this.service.absenceService.postDemandeRefusedId(this.data.id!).subscribe(()=>{
      this.service.employeeService.getByDepartement().subscribe(value => {
        this.service.entitiesSubject.next(value)
      })
    })
    this.dialog.closeAll()
  }
}
