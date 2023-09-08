import { Component, Input, OnInit } from '@angular/core';
import { DEPARTEMENTS } from 'src/app/models/departements';
import { ListAbsByEmployeeHttpService } from 'src/app/providers/listAbsByEmployee-http-service';

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
    this.getData();
  }

  private init(): void {}

  getData() {
    this.service.get("2").forEach((data) => console.log(`data :`, data));
  }

  onChange() {}

}
