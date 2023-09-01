import { Component } from '@angular/core';
import { AbsencesService } from './providers/absences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestion-des-absences-front';

  constructor (private service: AbsencesService) {}

  public getAbsence () {
      this.service.findAll().subscribe();
  }
}
