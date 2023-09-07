import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Absence } from 'src/app/models/absence';
import { CaseAbsence } from 'src/app/models/case-absence';
import { EmployeeC } from 'src/app/models/employee-c';
import { MONTHS } from 'src/app/models/month-year';
import { StatusAbsence } from 'src/app/models/status-absence';
import { EmployeeHttpService } from 'src/app/providers/employee-http-service';
import { ModalValidationAbsenceComponent } from 'src/app/shared/modal-validation-absence/modal-validation-absence.component';
import { AbsenceManagerService } from './providers/absence-manager.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-absences-manager',
  templateUrl: './absences-manager.component.html',
  styleUrls: ['./absences-manager.component.scss']
})
export class AbsencesManagerComponent implements OnInit, OnDestroy {

  months = MONTHS;
  monthPointer = 0;
  entitesSubscription? : Subscription;
  headers : number[] = [];
  tabEmployees : { employee : EmployeeC, absence : (CaseAbsence | undefined)[]}[] = [];
  employees : EmployeeC[] = []
  year = new Date().getFullYear();
  daysInMonth = this.getDaysInMonth(this.monthPointer+1, this.year);

  constructor(private service : AbsenceManagerService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.service.employeeService.getByDepartement().subscribe(value => {
      for(let employee of value){
        this.employees.push(new EmployeeC(employee))
      }
      this.initializeMonthTab();
    })
    this.entitesSubscription = this.service.entitiesSubject.subscribe(value => {
      this.employees = []
      for(let employee of value){
        this.employees.push(new EmployeeC(employee))
      }
      this.initializeMonthTab();
    })
  }

  ngOnDestroy(): void {
    this.entitesSubscription?.unsubscribe();
  }

  private initializeMonthTab(){
    this.headers = []
    this.tabEmployees = []
    for(let i = 0; i < this.getDaysInMonth(this.monthPointer+1, this.year); i++){
      this.headers.push(i+1);
    }
    for(let employee of this.employees){
      let rowEmployee : { employee : EmployeeC, absence : (CaseAbsence | undefined)[]} = {
        employee : employee,
        absence : this.createCaseAbsence(employee),
      }
      this.tabEmployees.push(rowEmployee);
    }
  }

  private createCaseAbsence(employee : EmployeeC){
    let casesAbsences : (CaseAbsence | undefined)[] = [];
    for(let i = 0; i < this.getDaysInMonth(this.monthPointer+1, this.year); i++){
      let newDate = new Date(this.year, this.monthPointer, i+1);
      let absence = (employee.absenceMap.get(newDate.toLocaleDateString()));
      casesAbsences.push(absence)
    }
    return casesAbsences;
  }

  decrementYear() {
    this.year--;
    this.initializeMonthTab()
  }

  incrementYear() {
    this.year++;
    this.initializeMonthTab()
  }

  getDaysInMonth(month : number, year:number) {
    return new Date(year, month, 0).getDate();
  }

  decrementMonth() {
    if (this.monthPointer == 0) {
      this.year--;
    }
    this.monthPointer = (this.monthPointer == 0) ? 11 : (this.monthPointer - 1) % 12;
    this.initializeMonthTab()
  }

  incrementMonth() {
    if (this.monthPointer == 11) {
      this.year++;
    }
    this.monthPointer = (this.monthPointer + 1) % 12;
    this.initializeMonthTab()
  }

  openChange(absence : CaseAbsence | undefined){
    if(absence && absence.absencePointer && absence.absencePointer.status == StatusAbsence.ATTENTE_VALIDATION){
      this.dialog.open(ModalValidationAbsenceComponent, {data : absence.absencePointer})
    }
  }

}
