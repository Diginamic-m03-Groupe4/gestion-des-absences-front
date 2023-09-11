import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { JourFerie } from 'src/app/models/jour-ferie';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { TabService } from 'src/app/models/tab-service.service';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { JoursFerieHttpService } from 'src/app/providers/jours-ferie-http-service';
import { RTTEmployeurHttpService } from 'src/app/providers/rtt-employeur-http-service';
import { ModalModifJFComponent } from 'src/app/shared/modal-modif-jf/modal-modif-jf.component';

@Injectable({
  providedIn: 'root'
})
export class RttTabService extends TabService<AbsenceEmployeur>{

  rttEmployeur: RttEmployeur[] = []
  jourFeries: JourFerie[] = []
  absenceEmployeurs : AbsenceEmployeur[] = [];

  constructor(public rttHttpService : RTTEmployeurHttpService, public jourFerieHttpService: JoursFerieHttpService, private dialog: MatDialog) {
    super();
  }

  mapRttToAbsenceEmployeur(rtt: RttEmployeur): AbsenceEmployeur {
    let absence: AbsenceEmployeur = {
      id: rtt.id,
      type: TypeAbsenceEmployeur.RTT,
      libelle: rtt.libelle,
      date: rtt.date,
      worked : false
    }
    return absence;
  }

  mapJFToAbsenceEmployeur(jf: JourFerie): AbsenceEmployeur {
    let absence: AbsenceEmployeur = {
      id: jf.id,
      type: TypeAbsenceEmployeur.FERIE,
      libelle: jf.libelle,
      date: jf.date,
      worked : jf.worked
    }
    return absence;
  }

  getAbsences(annee: number){
    return forkJoin([this.jourFerieHttpService.get(annee), this.rttHttpService.get(annee)])
  }


  changeAbsenceEmployeur(absenceEmployeur: AbsenceEmployeur): void {
    switch (absenceEmployeur.type) {
      case TypeAbsenceEmployeur.FERIE:
        let jourFerie = this.jourFeries
      .filter(jourFerie => jourFerie.id == absenceEmployeur.id)[0]
      this.dialog.open(ModalModifJFComponent, { data: jourFerie })
    }
  }

  override handleTabSignal(signal: TypeButton, entity?: AbsenceEmployeur): void {
    switch(signal){
      case TypeButton.AJOUT:
        console.log("ajout");
      break;
      case TypeButton.SUPPRESSION:
        console.log("suppr");
      break;
      case TypeButton.MODIFICATION:
        if (entity != undefined){
        this.changeAbsenceEmployeur(entity);
      }
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
      row.push((rtt.worked) ? "Travaillé" : "Non travaillé")
      tab.push(row);
    }
    return tab;
  }

  creerRTT(rtt : RttEmployeur){
  }

}
