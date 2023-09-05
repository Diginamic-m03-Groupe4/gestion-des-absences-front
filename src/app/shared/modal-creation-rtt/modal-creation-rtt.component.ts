import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateValidatorDirective } from 'src/app/directives/date-validator.directive';
import { ErrorMessage } from 'src/app/models/error-message';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { StatusAbsenceEmployeur } from 'src/app/models/status-absence-employeur';
import { RttTabService } from 'src/app/pages/rtt-tab-manager/providers/rtt-tab.service';

@Component({
  selector: 'app-modal-creation-rtt',
  templateUrl: './modal-creation-rtt.component.html',
  styleUrls: ['./modal-creation-rtt.component.scss']
})
export class ModalCreationRttComponent {

  submitted = false
  formCreation : FormGroup
  todayDate = Date.now()
  errorMessage = "";

  constructor(fb : FormBuilder, private dialog : MatDialog, private service: RttTabService){
    this.formCreation = fb.group({
      dateDebut : ["", Validators.required],
      dateFin : ["", [Validators.required]],
      libelle : ["", Validators.required]
    })
  }

  onModif(){
    this.submitted = true
    let startDate = new Date(this.dateDebut?.value)
    let endDate = new Date(this.dateFin?.value)
    let rtts : Partial<RttEmployeur>[] = []
    for(let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)){
      let rtt : Partial<RttEmployeur> = {
        date : structuredClone(date),
        libelle : this.libelle?.value,
      }
      rtts.push(rtt)
    }
    console.log(rtts)
    if(this.formCreation.valid){
      this.service.rttHttpService.post(rtts).subscribe({
        next : value => {
          this.service.getAbsences(endDate.getFullYear());
        },
        error : (err : ErrorMessage)  => console.log(err.message)
      })
      this.dialog.closeAll()
    }
  }

  onAnnulation(){
    this.dialog.closeAll();
  }

  onDateDebutChange($event : string){
    DateValidatorDirective.dateDebut = Date.parse($event)
  }

  get dateDebut(){
    return this.formCreation.get("dateDebut")
  }

  get dateFin(){
    return this.formCreation.get("dateFin")
  }

  get libelle(){
    return this.formCreation.get("libelle")
  }

}
