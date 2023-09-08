import { Component, Input, OnInit } from '@angular/core';
import { ListAbsByEmployeeHttpService } from 'src/app/providers/listAbsByEmployee-http-service';
import { DEPARTEMENTS } from 'src/app/models/departements';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss'],
})
export class HistogramComponent implements OnInit {
  title = 'Histogramme par département et par jour';
  type = 'Histogram';

  @Input() departementId!: string;
  @Input() departementName!: string;

  departements!: typeof DEPARTEMENTS;

  data = [];

  columnNames = ["Nombre de jours d'absences cumulés"];

  constructor(private service: ListAbsByEmployeeHttpService) {}

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    for (let ele of DEPARTEMENTS) {
      if (ele.id === this.departementId) {
      }
    }
  }

  getData(id: string) {
    this.service.get(id);
  }

  onChange() {
  }

}
function moment() {
  throw new Error('Function not implemented.');
}

