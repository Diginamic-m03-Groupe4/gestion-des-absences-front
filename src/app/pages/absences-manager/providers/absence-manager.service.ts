import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Absence } from 'src/app/models/absence';
import { TabService } from 'src/app/models/tab-service.service';
import { TableauButton } from 'src/app/models/tableau-buttons';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Injectable({
  providedIn: 'root'
})
export class AbsenceManagerService {

  private entitiesSubject:Subject<Absence[]> = new Subject();

  constructor(private httpServvice : AbsenceHttpService) {}

  getAbsences(){
    this.httpServvice.getDemande()
  }

}
