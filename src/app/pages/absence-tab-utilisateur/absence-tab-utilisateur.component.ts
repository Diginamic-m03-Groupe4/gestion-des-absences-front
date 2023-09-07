import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableauButton } from 'src/app/models/tableau-buttons';
import { AbsenceUtilTabService } from './providers/absence-util-tab.service';
import { Absence } from 'src/app/models/absence';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-absence-tab-utilisateur',
  templateUrl: './absence-tab-utilisateur.component.html',
  styleUrls: ['./absence-tab-utilisateur.component.scss']
})
export class AbsenceTabUtilisateurComponent implements OnInit, OnDestroy{

  buttons : TableauButton[] = [TableauButton.MODIFICATION, TableauButton.SUPPRESSION, TableauButton.AJOUT]
  enTetes : string[] = ["Date de début", "Date de fin", "Type de congé", "Motif", "Status"];

  annee : number = new Date().getFullYear();
  entities : Absence[] = [];
  absenceSubscription? : Subscription

  constructor(public service : AbsenceUtilTabService) { }

  ngOnInit(): void {
    this.service.getAbsences(this.annee);
    this.absenceSubscription = this.service.getEntitiesSubject().subscribe(value => {
      this.entities = value;
    })
  }

  ngOnDestroy(): void {
    this.absenceSubscription?.unsubscribe();
  }

  decrementYear(){
    this.annee--;
    this.service.getAbsences(this.annee);
  }

  incrementYear(){
    this.annee++;
    this.service.getAbsences(this.annee);
  }

}
