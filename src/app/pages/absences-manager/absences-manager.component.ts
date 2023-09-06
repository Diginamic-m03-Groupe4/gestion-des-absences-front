import { Component, OnInit } from '@angular/core';
import { AbsenceManagerService } from './providers/absence-manager.service';
import { Absence } from 'src/app/models/absence';

@Component({
  selector: 'app-absences-manager',
  templateUrl: './absences-manager.component.html',
  styleUrls: ['./absences-manager.component.scss']
})
export class AbsencesManagerComponent implements OnInit {

  absences : Absence[] = [];

  constructor(private service : AbsenceManagerService) { }

  ngOnInit(): void {
  }

}
