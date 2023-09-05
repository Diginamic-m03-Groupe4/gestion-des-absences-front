import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidatorDirective } from 'src/app/directives/date-validator.directive';

@Component({
  selector: 'app-modal-creation-rtt',
  templateUrl: './modal-creation-rtt.component.html',
  styleUrls: ['./modal-creation-rtt.component.scss']
})
export class ModalCreationRttComponent {

  submitted = false
  formCreation : FormGroup
  todayDate = Date.now()

  constructor(fb : FormBuilder){
    this.formCreation = fb.group({
      dateDebut : ["", Validators.required, DateValidatorDirective.dateDebutBeforeDateFin(this.dateFin!.value)],
      dateFin : ["", Validators.required],
      libelle : ["", Validators.required]
    })
  }

  onModif(){
    this.submitted = true
  }

  onAnnulation(){

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
