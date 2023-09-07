import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';
import { EmployeeHttpService } from 'src/app/providers/employee-http-service';
import { JoursFerieHttpService } from 'src/app/providers/jours-ferie-http-service';
import { RTTEmployeurHttpService } from 'src/app/providers/rtt-employeur-http-service';

@Injectable({
  providedIn: 'root'
})
export class AbsenceManagerService {

  public entitiesSubject:Subject<Employee[]> = new Subject();

  constructor(public employeeService : EmployeeHttpService, public absenceService : AbsenceHttpService, public jfHttpService : JoursFerieHttpService, public rttHttpService : RTTEmployeurHttpService) {}

}
