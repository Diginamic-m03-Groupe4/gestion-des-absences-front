import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeHttpService } from 'src/app/providers/employee-http-service';

interface SingleData {
  type: string;
  name: string;
  showInLegend: boolean;
  color: string;
  dataPoints: DataPoint[];
}

interface DataPoint {
  label: string;
  y: number;
}

interface ChartOptions {
  animationEnabled: boolean;
  exportEnabled: boolean;
  title: {
    text: string;
    fontFamily: string;
  };
  axisY: {
    title: string;
    reversed: boolean;
  };
  axisX: {
    title: string;
    prefix: string;
    suffix: string;
    includeZero: boolean;
  };
  toolTip: {
    shared: boolean;
  };
  data: SingleData[];
}

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss'],
})
export class HistogramComponent implements OnInit {
  @Input() year!: number;
  month!: number;

  @Input() months!: string[];
  @Input() daysInMonth!: number;

  allDatas: { nom: string; data: DataPoint[] }[] = [];

  chart: any;
  chartOptions: ChartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: 'Absences',
      fontFamily: 'Calibri, Arial, sans-serif',
    },
    axisY: {
      title: "Nombre d'absences",
      reversed: true,
    },
    axisX: {
      title: 'Jour du mois',
      prefix: '$',
      suffix: 'k',
      includeZero: false,
    },
    toolTip: {
      shared: true,
    },
    data: [],
  };

  employees!: Employee[];

  constructor(private service: EmployeeHttpService) {}

  public ngOnInit() {
    this.service.getByDepartement().subscribe({
      next: (val) => {
        this.employees = val;
        this.pushtoAllDatas();
        this.populateChartOptionsData();
        console.log(`chartOptions :`, this.chartOptions.data);
      },
      error: (err: any) => console.error(err),
    });
  }

  private populateChartOptionsData() {
    this.allDatas.forEach((data) => {
      this.chartOptions.data.push({
        type: 'stackedBar',
        name: data.nom,
        showInLegend: true,
        color: '',
        dataPoints: data.data,
      });
    });
  }

  private pushtoAllDatas() {
    this.employees.forEach((employee) => {
      this.allDatas.push({
        nom: employee.nom,
        data: this.createDataPoints(employee),
      });
    });
  }

  private createDataPoints(employee: Employee): DataPoint[] {
    let datas: DataPoint[] = [];
    for (let day of this.getDaysInMonth(this.year, this.month)) {
      if (this.hasAbsenceOnCurrentDay(day, employee)) {
        datas.push({
          label: day.toDateString(),
          y: 1,
        });
      } else {
        datas.push({
          label: day.toDateString(),
          y: 0,
        });
      }
    }
    return datas;
  }

  hasAbsenceOnCurrentDay(day: Date, employee: Employee) {
    let listAbsences: Date[] = [];
    for (let absences of employee.absences) {
      listAbsences = this.getDaysFromAbsenceByEmployee(
        absences.dateDebut,
        absences.dateFin
      );
    }
    return listAbsences.includes(day);
  }

  getDaysFromAbsenceByEmployee(dateDebut: string, dateFin: string) {
    const dateDeb = new Date(dateDebut);
    const dateFinal = new Date(dateFin);

    const listDates = [];
    for (
      let d = dateDeb;
      d.getDate() <= dateFinal.getDate();
      d.setDate(d.getDate() + 1)
    ) {
      listDates.push(d);
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
