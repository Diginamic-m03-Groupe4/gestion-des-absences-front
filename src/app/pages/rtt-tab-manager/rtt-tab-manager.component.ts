import { Component } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { TypeButton } from 'src/app/models/tableau-buttons';
import { TypeAbsenceEmployeur } from 'src/app/models/type-absence-employeur';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreationRttComponent } from 'src/app/shared/modal-creation-rtt/modal-creation-rtt.component';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { JourFerie } from 'src/app/models/jour-ferie';
import { isAdmin } from 'src/app/guards/is-logged-in.guard';
import { RttServiceService } from './providers/rtt-service.service';
import { JfServiceService } from './providers/jf-service.service';

@Component({
  selector: 'app-rtt-tab-manager',
  templateUrl: './rtt-tab-manager.component.html',
  styleUrls: ['./rtt-tab-manager.component.scss']
})
export class RttTabManagerComponent {

  isAdmin = isAdmin()
  annee = new Date().getFullYear();
  buttonsRtt: TypeButton[] = [
      TypeButton.MODIFICATION,
      TypeButton.SUPPRESSION,
  ]
  buttonsJF: TypeButton[] = [
      TypeButton.MODIFICATION,
  ]
  enTetesJF: string[] = ["Date", "Libelle", "Travaillé"];
  enTetesRtt: string[] = ["Date", "Libelle"];
  typeJour = TypeAbsenceEmployeur;

  jfSubscription?: Subscription
  rttSubscription?: Subscription
  formCheckbox : FormGroup


  constructor(public rttService : RttServiceService, public jfService : JfServiceService, fb:FormBuilder, private dialog : MatDialog) {
    this.formCheckbox = fb.group({
      "Jour férié": [true],
      "RTT Employeur": [true],
    })
  }

  ngOnInit(): void {
    this.annee = this.rttService.annee;
    this.getEntities();
    this.jfSubscription = this.jfService.getEntitiesSubject().subscribe((jf) => {
      this.jfService.shownJf = jf
    })
    this.rttSubscription = this.rttService.getEntitiesSubject().subscribe((rtt) => {
      this.rttService.shownRtt = rtt
    })
  }

  private getEntities() {
    forkJoin([this.rttService.httpService.get(this.rttService.annee), this.jfService.httpService.get(this.jfService.annee)]).subscribe(results => {
      this.rttService.shownRtt = results[0]
      this.jfService.shownJf = results[1]
    })
  }

  ngOnDestroy(): void {
    this.jfSubscription?.unsubscribe();
  }

  decrementYear() {
    this.annee--;
    this.rttService.annee--;
    this.jfService.annee--;
    this.getEntities();
  }

  incrementYear() {
    this.annee++;
    this.rttService.annee++;
    this.jfService.annee++;
    this.getEntities();
  }

  handleAjout(){
    this.dialog.open(ModalCreationRttComponent)
  }

  get jf() {
    return this.formCheckbox.get('jf') as FormControl;
  }

  get rtt() {
    return this.formCheckbox.get('rtt') as FormControl;
  }
}
