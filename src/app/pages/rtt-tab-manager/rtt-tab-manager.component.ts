import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableauButton } from 'src/app/models/tableau-buttons';
import { RttTabService } from './providers/rtt-tab.service';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';

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

  constructor(public service: RttTabService) { }

  ngOnInit(): void {
    this.service.getAbsences(this.annee);
    this.absenceSubscription = this.service.getEntitiesSubject().subscribe(value => {
      this.entities = value;
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
}
