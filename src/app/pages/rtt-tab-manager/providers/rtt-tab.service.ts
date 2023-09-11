import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { SuppressionAbsenceComponent } from 'src/app/formulaire/components/suppression.absence/suppression.absence.component';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { JourFerie } from 'src/app/models/jour-ferie';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { TabService } from 'src/app/models/tab-service.service';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { JoursFerieHttpService } from 'src/app/providers/jours-ferie-http-service';
import { RTTEmployeurHttpService } from 'src/app/providers/rtt-employeur-http-service';
import { ModalCreationRttComponent } from 'src/app/shared/modal-creation-rtt/modal-creation-rtt.component';
import { ModalModifJFComponent } from 'src/app/shared/modal-modif-jf/modal-modif-jf.component';
import { ModalModifRTTComponent } from 'src/app/shared/modal-modif-rtt/modal-modif-rtt.component';
import { ModalSuppressionRttComponent } from 'src/app/shared/modal-suppression-rtt/modal-suppression-rtt.component';

@Injectable({
  providedIn: 'root'
})
export class RttTabService extends TabService<AbsenceEmployeur>{

  rttEmployeur: RttEmployeur[] = []
  annee: number = new Date().getFullYear();
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
      break;
      case TypeAbsenceEmployeur.RTT:
        let rtt = this.rttEmployeur.filter(rtt => rtt.id == absenceEmployeur.id)[0]
        this.dialog.open(ModalModifRTTComponent, { data: rtt })
    }
  }

  deleteAbsenceEmployeur(entity : AbsenceEmployeur){
    if (entity.type == TypeAbsenceEmployeur.FERIE){
      this.changeAbsenceEmployeur(entity);
    } else {
      let rtt = this.rttEmployeur.filter(rtt => rtt.id == entity.id)
      this.dialog.open(ModalSuppressionRttComponent, {data:entity})
    }
  }

  override handleTabSignal(signal: TypeButton, entity?: AbsenceEmployeur): void {
    switch(signal){
      case TypeButton.AJOUT:
        console.log("ajout");
      break;
      case TypeButton.SUPPRESSION:
        if (entity != undefined){
          this.deleteAbsenceEmployeur(entity);
        }
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
