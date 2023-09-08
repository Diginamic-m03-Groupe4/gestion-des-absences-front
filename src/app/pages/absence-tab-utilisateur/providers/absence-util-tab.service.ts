import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreationAbsenceComponent } from 'src/app/formulaire/components/creation.absence/creation.absence.component';
import { ModificationAbsenceComponent } from 'src/app/formulaire/components/modification.absence/modification.absence.component';
import { SuppressionAbsenceComponent } from 'src/app/formulaire/components/suppression.absence/suppression.absence.component';
import { Absence } from 'src/app/models/absence';
import { TabService } from 'src/app/models/tab-service.service';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Injectable({
  providedIn: 'root'
})
export class AbsenceUtilTabService extends TabService<Absence>{

  annee : number = new Date().getFullYear();
  constructor(public httpService:AbsenceHttpService, private dialog:MatDialog) {
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
        this.dialog.open(CreationAbsenceComponent)
        break;
      case TypeButton.DETAIL:
        console.log("detail");
        break;
      case TypeButton.SUPPRESSION:
        console.log("suppr");
        this.dialog.open(SuppressionAbsenceComponent, {data: entity});
        break;
      case TypeButton.ACTIVATION:
        console.log("activation");
        break;
      case TypeButton.MODIFICATION:
        console.log("modif");
        this.dialog.open(ModificationAbsenceComponent, {data: entity})
        break;
    }
  }
}
