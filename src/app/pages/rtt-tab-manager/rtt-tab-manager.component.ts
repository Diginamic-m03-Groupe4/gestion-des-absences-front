import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { RttTabService } from './providers/rtt-tab.service';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreationRttComponent } from 'src/app/shared/modal-creation-rtt/modal-creation-rtt.component';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { JourFerie } from 'src/app/models/jour-ferie';

@Component({
  selector: 'app-rtt-tab-manager',
  templateUrl: './rtt-tab-manager.component.html',
  styleUrls: ['./rtt-tab-manager.component.scss']
})
export class RttTabManagerComponent {

  buttons: TypeButton[] = [TypeButton.MODIFICATION, TypeButton.SUPPRESSION]
  enTetes: string[] = ["Date", "Libelle", "Type", "Travaillé"];
  typeJour = TypeAbsenceEmployeur;

  annee: number = new Date().getFullYear();
  entities: AbsenceEmployeur[] = [];
  shownEntities: AbsenceEmployeur[] = [];
  absenceSubscription?: Subscription
  formCheckbox : FormGroup


  constructor(public service: RttTabService, fb:FormBuilder, private dialog : MatDialog) {
    this.formCheckbox = fb.group({
      "Jour férié": [true],
      "RTT Employeur": [true],
    })
  }

  ngOnInit(): void {
    this.service.getAbsences(this.annee).subscribe(results => this.getEntities(results))
    this.absenceSubscription = this.service.getEntitiesSubject().subscribe(value => {
      this.entities = value
      this.shownEntities = []
    })
  }

  private getEntities(results : [JourFerie[], RttEmployeur[]]) {
      let absenceEmployeurs : AbsenceEmployeur[] = []
      this.service.jourFeries = results[0]
      this.service.rttEmployeur = results[1]
      results[0].forEach(result => absenceEmployeurs.push( this.service.mapJFToAbsenceEmployeur(result)))
      results[1].forEach(result => absenceEmployeurs.push( this.service.mapRttToAbsenceEmployeur(result)))
      this.service.absenceEmployeurs = absenceEmployeurs
      this.service.getEntitiesSubject().next(absenceEmployeurs)
  }

  ngOnDestroy(): void {
    this.absenceSubscription?.unsubscribe();
  }

  decrementYear() {
    this.annee--;
    this.service.getAbsences(this.annee).subscribe(results => this.getEntities(results));
  }

  incrementYear() {
    this.annee++;
    this.service.getAbsences(this.annee).subscribe(results => this.getEntities(results));
  }

  handleAjout(){
    this.dialog.open(ModalCreationRttComponent)
  }

  handleFilter(){
    this.shownEntities = []
    for (let entity of this.entities) {
      if (this.formCheckbox.get(entity.type)?.value) {
        this.entities.push(entity)
      }
    }
    this.service.getAbsences(this.annee).subscribe(results => this.getEntities(results));
  }

  get jf() {
    return this.formCheckbox.get('jf') as FormControl;
  }

  get rtt() {
    return this.formCheckbox.get('rtt') as FormControl;
  }
}
