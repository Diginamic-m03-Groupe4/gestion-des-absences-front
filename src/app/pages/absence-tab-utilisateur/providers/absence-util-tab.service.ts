import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Absence } from 'src/app/models/absence';
import { TabService } from 'src/app/models/tab-service.service';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Injectable({
  providedIn: 'root'
})
export class AbsenceUtilTabService extends TabService<Absence>{

  constructor(private httpService:AbsenceHttpService, private dialog:MatDialog) {
    super();
  }

  override mapToPresentation(entities: Absence[]): string[][] {
    let results:string[][] = [];
    for (const absence of entities) {
      let row:string[] = [];
      row.push(absence.dateDebut.toString());
      row.push(absence.dateFin.toString());
      row.push(absence.typeConge);
      row.push(absence.motif);
      row.push(absence.status);
      results.push(row);
    }
    return results;
  }

  getAbsences(annee:number){
    this.httpService.get(annee).subscribe(value => {
      this.getEntitiesSubject().next(value);
    });
  }

  override handleTabSignal(signal: TypeButton, entity?: any): void {
    console.log(entity);
    switch(signal){
      case TypeButton.AJOUT:
        console.log("ajout");
        break;
      case TypeButton.DETAIL:
        console.log("detail");
        break;
      case TypeButton.SUPPRESSION:
        console.log("suppr");
        break;
      case TypeButton.ACTIVATION:
        console.log("activation");
        break;
      case TypeButton.MODIFICATION:
        console.log("modif");
        break;
    }
  }
}
