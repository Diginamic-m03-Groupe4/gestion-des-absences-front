import { Injectable } from '@angular/core';
import { TabService } from 'src/app/models/tab-service.service';
import { JourFerie } from 'src/app/models/jour-ferie';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { JoursFerieHttpService } from 'src/app/providers/jours-ferie-http-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalModifJFComponent } from 'src/app/shared/modal-modif-jf/modal-modif-jf.component';

@Injectable({
  providedIn: 'root'
})
export class JfServiceService extends TabService<JourFerie> {

  annee = new Date().getFullYear();
  shownJf: JourFerie[] = [];
  constructor(public httpService : JoursFerieHttpService, private dialog: MatDialog) {
    super();
  }

  override handleTabSignal(signal: TypeButton, entity?: any): void {
    switch(signal){
      case TypeButton.MODIFICATION:
        if (entity != undefined){
          this.dialog.open(ModalModifJFComponent, { data: entity })
        }
      break;
    }

  }
  override mapToPresentation(entities: JourFerie[]): string[][] {
    let tab: string[][] = [];
    for(const rtt of entities){
      let row: string[] = [];
      row.push(rtt.date.toString());
      row.push(rtt.libelle);
      row.push((rtt.worked) ? "Travaillé" : "Non travaillé")
      tab.push(row);
    }
    return tab;
  }
}
