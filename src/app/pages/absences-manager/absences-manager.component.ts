import { Component, OnInit } from '@angular/core';
import { CaseAbsence } from 'src/app/models/case-absence';
import { EmployeeC } from 'src/app/models/employee-c';
import { MONTHS } from 'src/app/models/month-year';
import { EmployeeHttpService } from 'src/app/providers/employee-http-service';


@Component({
  selector: 'app-absences-manager',
  templateUrl: './absences-manager.component.html',
  styleUrls: ['./absences-manager.component.scss']
})
export class AbsencesManagerComponent implements OnInit {

  months = MONTHS;
  monthPointer = 0;
  headers : number[] = [];
  tabEmployees : { employee : EmployeeC, absence : (CaseAbsence | undefined)[]}[] = [];
  employees : EmployeeC[] = []
  year = new Date().getFullYear();
  daysInMonth = this.getDaysInMonth(this.monthPointer+1, this.year);

  constructor(private service : EmployeeHttpService) { }

  ngOnInit(): void {
    this.service.getByDepartement().subscribe(value => {
      for(let employee of value){
        this.employees.push(new EmployeeC(employee))
      }
      this.initializeMonthTab();
    })
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

}
