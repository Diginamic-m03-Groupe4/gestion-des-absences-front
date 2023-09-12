import { Component, Input, OnInit } from '@angular/core';
import { DEPARTEMENTS } from 'src/app/models/departements';
import { Employee } from 'src/app/models/employee';
import { MONTHS } from 'src/app/models/month-year';
import { EmployeeHttpService } from 'src/app/providers/employee-http-service';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss'],
})
export class HistogramComponent implements OnInit {
  chart: any;

  employees!: Employee[];
  employeeAbsence!: {};
  employeeListAbsence!: any[];
  @Input() months: number = 9;
  @Input() year: number = 2023;
  data: [
    (
      | {
          type: string;
          name: string;
          showInLegend: boolean;
          dataPoints: {
            label: string;
            y: number;
          }[];
        }
      | {
          type: string;
          name: string;
          showInLegend: boolean;
          dataPoints: {
            label: string;
            y: number;
          }[];
        }
    )[]
  ] = [[]];

  departement!: typeof DEPARTEMENTS;
  id!: string;

  fullFillListOfAbsences() {
    for (let employe of this.employees) {
      for (let absence of employe.absences) {
        let listOfAbsences = this.getDaysFromAbsenceByEmployee(
          absence.dateDebut,
          absence.dateFin
        );
        for (let day of listOfAbsences) {
          if (
            this.populateGraph().filter((x) => {
              x.dataPoints.forEach((obj) => obj.label === day.toDateString());
            })
          ) {
            this.populateGraph().map((x) => {
              x.name = employe.nom;
              x.dataPoints.map((obj) => obj.y++);
            });
          }
        }
      }
    }
    return this.populateGraph();
  }

  populateGraph() {
    let listOfDates= [];
    let listDaysOfMonth = this.getDaysInMonth(this.year, this.months);
    for (let dayOfMonth of listDaysOfMonth) {
      listOfDates.push({
        type: 'stackedColumn',
        name: 'none',
        showInLegend: true,
        dataPoints: [{ label: dayOfMonth.toDateString(), y: 0 }],
      });
    }
    return listOfDates;
  }

  chartOptions = {
    theme: 'light2',
    title: {
      text: 'Synthèse des jours',
    },
    animationEnabled: true,
    toolTip: {
      shared: true,
    },
    legend: {
      horizontalAlign: 'right',
      verticalAlign: 'center',
      reversed: true,
    },
    axisY: {
      includeZero: true,
    },
    data: this.populateGraph(),
  };
  //     { label: 'Qtr 1', y: 19 },
  //     { label: 'Qtr 2', y: 22 },
  //     { label: 'Qtr 3', y: 12 },
  //     { label: 'Qtr 4', y: 22 },
  //   ],
  // },
  // {
  //   type: 'stackedColumn',
  //   name: ``,
  //   showInLegend: true,
  //   dataPoints: [
  //     { label: 'Qtr 1', y: 42 },
  //     { label: 'Qtr 2', y: 63 },
  //     { label: 'Qtr 3', y: 35 },
  //     { label: 'Qtr 4', y: 38 },
  //   ],
  // },
  // {
  //   type: 'stackedColumn',
  //   name: ``,
  //   showInLegend: true,
  //   dataPoints: [
  //     { label: 'Qtr 1', y: 53 },
  //     { label: 'Qtr 2', y: 86 },
  //     { label: 'Qtr 3', y: 47 },
  //     { label: 'Qtr 4', y: 94 },
  //   ],
  // },
  // ],

  // [
  // ],

  constructor(private service: EmployeeHttpService) {}

  public ngOnInit() {
    this.initData();
  }

  private initData() {
    this.getData();
    console.log(`this.populateGraph : `, this.populateGraph());
  }

  getData() {
    this.service.getByDepartement().subscribe({
      next: (val) => {
        this.employees = val;
        this.populateGraph();
        this.fullFillListOfAbsences();
      },
      error: (err: any) => console.error(err),
    });
  }

  getDaysFromAbsenceByEmployee(dateDebut: string, dateFin: string) {
    for (
      var listDates = [], d = new Date(dateDebut);
      d <= new Date(dateFin);
      d.setDate(d.getDate() + 1)
    ) {
      listDates.push(new Date(d));
    }
    return listDates;
  }

  getDaysInMonth(year: number, month: number): Date[] {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() == month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
}
