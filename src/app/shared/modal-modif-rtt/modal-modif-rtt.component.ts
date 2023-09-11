import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { RttTabService } from 'src/app/pages/rtt-tab-manager/providers/rtt-tab.service';

@Component({
  selector: 'app-modal-modif-rtt',
  templateUrl: './modal-modif-rtt.component.html',
  styleUrls: ['./modal-modif-rtt.component.scss']
})
export class ModalModifRTTComponent {
  submitted = false
  formModif : FormGroup
  todayDate = Date.now()
  errorMessage = "";

  constructor( @Inject(MAT_DIALOG_DATA) private data: RttEmployeur, private service: RttTabService, private dialog : MatDialog, fb : FormBuilder) {
    this.formModif = fb.group({
      date: [data.date, Validators.required],
      libelle : [data.libelle, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onModif(){
    this.service.rttHttpService.putByid(this.data).subscribe({
      next : value => {
        for(let i = 0; i < this.service.absenceEmployeurs.length; i++){
          if(this.service.absenceEmployeurs[i].id == value.id && this.service.absenceEmployeurs[i].type == TypeAbsenceEmployeur.RTT){
            this.service.absenceEmployeurs[i] = this.service.mapRttToAbsenceEmployeur(value);
          }
        }
        this.service.getEntitiesSubject().next(this.service.absenceEmployeurs)
        this.dialog.closeAll()
      },
      error : (err) => {
        this.errorMessage = err.error.message
      }
    })
  }

  onAnnulation(){
    this.dialog.closeAll()
  }
  get libelle(){
    return this.formModif.get("libelle")
  }
  get date(){
    return this.formModif.get("date")
  }

}
