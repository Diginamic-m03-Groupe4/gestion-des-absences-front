import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabButton, TypeButton } from 'src/app/models/tableau-buttons';
import { AbsenceUtilTabService } from './providers/absence-util-tab.service';
import { Absence } from 'src/app/models/absence';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-absence-tab-utilisateur',
  templateUrl: './absence-tab-utilisateur.component.html',
  styleUrls: ['./absence-tab-utilisateur.component.scss']
})
export class AbsenceTabUtilisateurComponent implements OnInit, OnDestroy{

  typeButton = TypeButton;
  buttons : TypeButton[] = [
      this.typeButton.SUPPRESSION,
      this.typeButton.MODIFICATION,
      this.typeButton.AJOUT,
  ]
  permission = true;
  enTetes : string[] = ["Date de début", "Date de fin", "Type de congé", "Motif", "Status"];

  entities : Absence[] = [];
  absenceSubscription? : Subscription

  constructor(public service : AbsenceUtilTabService) { }

  ngOnInit(): void {
    this.service.getAbsences(this.service.annee);
    this.absenceSubscription = this.service.getEntitiesSubject().subscribe(value => {
      this.entities = value;
      this.entities.sort((a, b) => {
        return a.dateDebut > b.dateDebut ? 1 : -1;
      })
    })
  }

  ngOnDestroy(): void {
    this.absenceSubscription?.unsubscribe();
  }

  decrementYear(){
    this.service.annee--;
    this.service.getAbsences(this.service.annee);
  }

  incrementYear(){
    this.service.annee++;
    this.service.getAbsences(this.service.annee);
  }

}
