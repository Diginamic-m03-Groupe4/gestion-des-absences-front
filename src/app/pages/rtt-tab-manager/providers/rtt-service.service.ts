import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { TabService } from 'src/app/models/tab-service.service';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { RTTEmployeurHttpService } from 'src/app/providers/rtt-employeur-http-service';
import { ModalModifRTTComponent } from 'src/app/shared/modal-modif-rtt/modal-modif-rtt.component';
import { ModalSuppressionRttComponent } from 'src/app/shared/modal-suppression-rtt/modal-suppression-rtt.component';

@Injectable({
  providedIn: 'root'
})
export class RttServiceService extends TabService<RttEmployeur>{

  shownRtt: RttEmployeur[] = [];
  annee = new Date().getFullYear();

  constructor(public httpService : RTTEmployeurHttpService, private dialog: MatDialog) {
    super();
  }

  override handleTabSignal(signal: TypeButton, entity?: any): void {
    switch(signal){
      case TypeButton.MODIFICATION:
        if (entity != undefined){
          this.dialog.open(ModalModifRTTComponent, { data: entity })
        }
      break;
      case TypeButton.SUPPRESSION:
        if (entity != undefined){
          this.dialog.open(ModalSuppressionRttComponent, { data: entity })
        }
    }
  }
  override mapToPresentation(entities: RttEmployeur[]): string[][] {
    let tab: string[][] = [];
    for(const rtt of entities){
      let row: string[] = [];
      row.push(rtt.date.toString());
      row.push(rtt.libelle);
      tab.push(row);
    }
    return tab;

  }
}
