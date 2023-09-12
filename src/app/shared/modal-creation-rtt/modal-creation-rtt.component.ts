import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateValidatorDirective } from 'src/app/directives/date-validator.directive';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { RttServiceService } from 'src/app/pages/rtt-tab-manager/providers/rtt-service.service';

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

  constructor(fb : FormBuilder, private dialog : MatDialog, private service: RttServiceService){
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
    if(this.formCreation.valid){
      this.service.httpService.post(rtts).subscribe({
        next : value => {
          this.service.shownRtt = this.service.shownRtt.concat(value)
          this.dialog.closeAll()
        },
        error : (err)  => this.errorMessage = err.error.message
      })
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
