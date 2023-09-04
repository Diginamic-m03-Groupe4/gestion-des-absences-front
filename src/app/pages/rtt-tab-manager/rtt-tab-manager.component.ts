import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableauButton } from 'src/app/models/tableau-buttons';
import { RttTabService } from './providers/rtt-tab.service';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type FilterFunc = (absence: AbsenceEmployeur) => boolean;

@Component({
  selector: 'app-rtt-tab-manager',
  templateUrl: './rtt-tab-manager.component.html',
  styleUrls: ['./rtt-tab-manager.component.scss']
})
export class RttTabManagerComponent {

  buttons: TableauButton[] = [TableauButton.MODIFICATION, TableauButton.SUPPRESSION]
  enTetes: string[] = ["Date", "Libelle", "Type"];
  typeJour = TypeAbsenceEmployeur;

  annee: number = new Date().getFullYear();
  entities: AbsenceEmployeur[] = [];
  absenceSubscription?: Subscription
  formCheckbox : FormGroup
  filterFunc: FilterFunc = (absence: AbsenceEmployeur) => true;


  constructor(public service: RttTabService, fb:FormBuilder) {
    this.formCheckbox = fb.group({
      jf: [true],
      rtt: [true],
    })
  }

  ngOnInit(): void {
    this.service.getAbsences(this.annee);
    this.absenceSubscription = this.service.getEntitiesSubject().subscribe(value => {
      this.entities = value.filter(this.filterFunc);
    })
  }

  ngOnDestroy(): void {
    this.absenceSubscription?.unsubscribe();
  }

  decrementYear() {
    this.annee--;
    this.service.getAbsences(this.annee);
  }

  incrementYear() {
    this.annee++;
    this.service.getAbsences(this.annee);
  }

  handleAjout(typeJour : TypeAbsenceEmployeur){
    console.log(typeJour);
  }

  handleFilter(){
    if(this.jf.value && this.rtt.value){
      this.filterFunc = (absence: AbsenceEmployeur) => true;
    } else if(this.jf.value && !this.rtt.value){
      this.filterFunc = (absence: AbsenceEmployeur) => absence.type == TypeAbsenceEmployeur.FERIE;
    } else if(this.rtt.value){
      this.filterFunc = (absence: AbsenceEmployeur) => absence.type == TypeAbsenceEmployeur.RTT;
    } else {
      this.filterFunc = (absence: AbsenceEmployeur) => false;
    }
    this.service.getAbsences(this.annee);
  }

  get jf() {
    return this.formCheckbox.get('jf') as FormControl;
  }

  get rtt() {
    return this.formCheckbox.get('rtt') as FormControl;
  }
}
