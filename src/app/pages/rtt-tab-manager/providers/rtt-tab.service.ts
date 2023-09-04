import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { JourFerie } from 'src/app/models/jour-ferie';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { TabService } from 'src/app/models/tab-service.service';
import { TableauButton } from 'src/app/models/tableau-buttons';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { JoursFerieHttpService } from 'src/app/providers/jours-ferie-http-service';
import { RTTEmployeurHttpService } from 'src/app/providers/rtt-employeur-http-service';

@Injectable({
  providedIn: 'root'
})
export class RttTabService extends TabService<AbsenceEmployeur>{

  private rttEmployeur: RttEmployeur[] = []
  private jourFeries: JourFerie[] = []

  constructor(private rttHttpService : RTTEmployeurHttpService, private jourFerieHttpService: JoursFerieHttpService) {
    super();
  }

  private mapRttToAbsenceEmployeur(rtt: RttEmployeur): AbsenceEmployeur {
    let absence: AbsenceEmployeur = {
      id: rtt.id,
      type: TypeAbsenceEmployeur.RTT,
      libelle: rtt.libelle,
      date: rtt.date
    }
    return absence;
  }

  private mapJFToAbsenceEmployeur(jf: JourFerie): AbsenceEmployeur {
    let absence: AbsenceEmployeur = {
      id: jf.id,
      type: TypeAbsenceEmployeur.FERIE,
      libelle: jf.libelle,
      date: jf.date
    }
    return absence;
  }

  getAbsences(annee: number): void {
    forkJoin([this.jourFerieHttpService.get(annee), this.rttHttpService.get(annee)]).subscribe(results => {
      let absenceEmployeur : AbsenceEmployeur[] = []
      this.jourFeries = results[0]
      this.rttEmployeur = results[1]
      results[0].forEach(result => absenceEmployeur.push( this.mapJFToAbsenceEmployeur(result)))
      results[1].forEach(result => absenceEmployeur.push( this.mapRttToAbsenceEmployeur(result)))
      this.getEntitiesSubject().next(absenceEmployeur)
    })
  }

  override handleTabSignal(signal: TableauButton, entity?: any): void {
    console.log(entity);
    switch(signal){
      case TableauButton.AJOUT:
        console.log("ajout");
        break;
      case TableauButton.DETAIL:
        console.log("detail");
        break;
      case TableauButton.SUPPRESSION:
        console.log("suppr");
        break;
      case TableauButton.ACTIVATION:
        console.log("activation");
        break;
      case TableauButton.MODIFICATION:
        console.log("modif");
        break;
    }
  }

  override mapToPresentation(entities: AbsenceEmployeur[]): string[][] {
    let tab: string[][] = [];
    for(const rtt of entities){
      let row: string[] = [];
      row.push(rtt.date.toString());
      row.push(rtt.libelle);
      row.push(rtt.type);
      tab.push(row);
    }
    return tab;
  }

}
