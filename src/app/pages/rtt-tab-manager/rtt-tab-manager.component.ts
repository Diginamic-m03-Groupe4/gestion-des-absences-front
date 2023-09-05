import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableauButton } from 'src/app/models/tableau-buttons';
import { RttTabService } from './providers/rtt-tab.service';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreationRttComponent } from 'src/app/shared/modal-creation-rtt/modal-creation-rtt.component';

type FilterFunc = (absence: AbsenceEmployeur) => boolean;

@Component({
  selector: 'app-rtt-tab-manager',
  templateUrl: './rtt-tab-manager.component.html',
  styleUrls: ['./rtt-tab-manager.component.scss']
})
export class RttTabManagerComponent {

  buttons: TableauButton[] = [TableauButton.MODIFICATION, TableauButton.SUPPRESSION]
  enTetes: string[] = ["Date", "Libelle", "Type", "Travaillé"];
  typeJour = TypeAbsenceEmployeur;

  annee: number = new Date().getFullYear();
  entities: AbsenceEmployeur[] = [];
  absenceSubscription?: Subscription
  formCheckbox : FormGroup


  constructor(public service: RttTabService, fb:FormBuilder, private dialog : MatDialog) {
    this.formCheckbox = fb.group({
      "Jour férié": [true],
      "RTT Employeur": [true],
    })
  }

  ngOnInit(): void {
    this.service.getAbsences(this.annee);
    this.absenceSubscription = this.service.getEntitiesSubject().subscribe(value => {
      this.entities = []
      for (let entity of value) {
        if (this.formCheckbox.get(entity.type)?.value) {
          this.entities.push(entity)
        }
      }
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

  handleAjout(){
    this.dialog.open(ModalCreationRttComponent)
  }

  handleFilter(){
    this.service.getAbsences(this.annee);
  }

  get jf() {
    return this.formCheckbox.get('jf') as FormControl;
  }

  get rtt() {
    return this.formCheckbox.get('rtt') as FormControl;
  }
}
