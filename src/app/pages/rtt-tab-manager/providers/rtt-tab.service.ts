import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { AbsenceEmployeur } from 'src/app/models/absence-employeur';
import { JourFerie } from 'src/app/models/jour-ferie';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { TabService } from 'src/app/models/tab-service.service';
import { TableauButton } from 'src/app/models/tableau-buttons';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { JoursFerieHttpService } from 'src/app/providers/jours-ferie-http-service';
import { RTTEmployeurHttpService } from 'src/app/providers/rtt-employeur-http-service';
import { ModalModifJFComponent } from 'src/app/shared/modal-modif-jf/modal-modif-jf.component';

@Injectable({
  providedIn: 'root'
})
export class RttTabService extends TabService<AbsenceEmployeur>{

  private rttEmployeur: RttEmployeur[] = []
  private jourFeries: JourFerie[] = []
  private absenceEmployeurs : AbsenceEmployeur[] = [];

  constructor(private rttHttpService : RTTEmployeurHttpService, private jourFerieHttpService: JoursFerieHttpService, private dialog: MatDialog) {
    super();
  }

  private mapRttToAbsenceEmployeur(rtt: RttEmployeur): AbsenceEmployeur {
    let absence: AbsenceEmployeur = {
      id: rtt.id,
      type: TypeAbsenceEmployeur.RTT,
      libelle: rtt.libelle,
      date: rtt.date,
      worked : false
    }
    return absence;
  }

  private mapJFToAbsenceEmployeur(jf: JourFerie): AbsenceEmployeur {
    let absence: AbsenceEmployeur = {
      id: jf.id,
      type: TypeAbsenceEmployeur.FERIE,
      libelle: jf.libelle,
      date: jf.date,
      worked : jf.worked
    }
    return absence;
  }

  getAbsences(annee: number): void {
    forkJoin([this.jourFerieHttpService.get(annee), this.rttHttpService.get(annee)]).subscribe(results => {
      let absenceEmployeurs : AbsenceEmployeur[] = []
      this.jourFeries = results[0]
      this.rttEmployeur = results[1]
      results[0].forEach(result => absenceEmployeurs.push( this.mapJFToAbsenceEmployeur(result)))
      results[1].forEach(result => absenceEmployeurs.push( this.mapRttToAbsenceEmployeur(result)))
      this.absenceEmployeurs = absenceEmployeurs
      this.getEntitiesSubject().next(absenceEmployeurs)
    })
  }

  changeAbsenceEmployeur(absenceEmployeur: AbsenceEmployeur): void {
    switch (absenceEmployeur.type) {
      case TypeAbsenceEmployeur.FERIE:
        let jourFerie = this.jourFeries
          .filter(jourFerie => jourFerie.id == absenceEmployeur.id)[0]
        this.dialog.open(ModalModifJFComponent, { data: jourFerie })
    }
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
        this.changeAbsenceEmployeur(entity);
        break;
    }
  }

  override mapToPresentation(entities: AbsenceEmployeur[]): string[][] {
    let tab: string[][] = [];
    for(const rtt of entities){
      console.log(rtt)
      let row: string[] = [];
      row.push(rtt.date.toString());
      row.push(rtt.libelle);
      row.push(rtt.type);
      row.push((rtt.worked) ? "Travaillé" : "Non travaillé")
      tab.push(row);
    }
    return tab;
  }

  modifierJF(jf : JourFerie){
    this.jourFerieHttpService.put(jf).subscribe(value => {
      for(let i = 0; i < this.absenceEmployeurs.length; i++){
        if(this.absenceEmployeurs[i].id == value.id && this.absenceEmployeurs[i].type == TypeAbsenceEmployeur.FERIE){
          this.absenceEmployeurs[i] = this.mapJFToAbsenceEmployeur(value);
        }
      }
      this.getEntitiesSubject().next(this.absenceEmployeurs)
    })
  }

}
