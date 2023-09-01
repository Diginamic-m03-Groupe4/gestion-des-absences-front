import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Absence } from 'src/app/models/absence';
import { StatusAbsence } from 'src/app/models/status-absence';
import { AbsenceHttpService } from 'src/app/providers/absence-http-service';

@Component({
  selector: 'app-creation.absence',
  templateUrl: './creation.absence.component.html',
  styleUrls: ['./creation.absence.component.scss'],
})
export class CreationAbsenceComponent implements OnInit {

  absence!: Absence;
  
  @Input() dateDebut!: Date;
  @Input() dateFin!: Date;
  congesPayes: boolean = false;
  congesSansSolde: boolean = false;
   rtt: boolean = false;
   motif: string = "ajouter votre motif si c'est un congé sans solde";
  
  form: FormGroup = new FormGroup({
    dateDebut: new FormControl(this.dateDebut),
    dateFin: new FormControl(this.dateFin),
    congesPayes: new FormControl(this.congesPayes),
    congesSansSolde: new FormControl(this.congesSansSolde),
    rtt: new FormControl(this.rtt),
    motif: new FormControl(this.motif),
  });

  constructor(private _absenceHttpService: AbsenceHttpService) {}
  
  ngOnInit(): void {
    this._init();
  }

  private _init() {
    this.onSubmit();
}

  onSubmit() {
    this.absence.dateDebut = this.dateDebut;
    this.absence.dateFin = this.dateFin;
    this.absence.motif = this.motif;
    this.absence.status = StatusAbsence.INITIALE;
    this.absence.typeConge = 

    this._absenceHttpService.post(this.absence).subscribe( () => {
})
}
}
