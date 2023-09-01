import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormulaireService } from '../../shared/formulaire.service';

@Component({
  selector: 'app-creation.absence',
  templateUrl: './creation.absence.component.html',
  styleUrls: ['./creation.absence.component.scss'],
})
export class CreationAbsenceComponent implements OnInit {
  
  @Input() dateDebut!: Date;
  @Input() dateFin!: Date;
  @Input() congesPayes!: boolean;
  @Input() congesSansSolde!: boolean;
  @Input() rtt!: boolean;
  @Input() motif!: string;
  
  form: FormGroup = new FormGroup({
    dateDebut: new FormControl(this.dateDebut),
    dateFin: new FormControl(this.dateFin),
    congesPayes: new FormControl(this.congesPayes),
    congesSansSolde: new FormControl(this.congesSansSolde),
    rtt: new FormControl(this.rtt),
    motif: new FormControl(this.motif),
  });

  constructor(private _formulaireService: FormulaireService) {}
  
  ngOnInit(): void {
  }

  private _init() {
}

  onSubmit() {}
}
