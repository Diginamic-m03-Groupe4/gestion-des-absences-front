import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RttEmployeur } from 'src/app/models/rtt-employeur';
import { RttServiceService } from 'src/app/pages/rtt-tab-manager/providers/rtt-service.service';

@Component({
  selector: 'app-modal-modif-rtt',
  templateUrl: './modal-modif-rtt.component.html',
  styleUrls: ['./modal-modif-rtt.component.scss']
})
export class ModalModifRTTComponent {
  submitted = false
  formModif : FormGroup
  todayDate = Date.now()
  errorMessage = "";

  constructor( @Inject(MAT_DIALOG_DATA) private data: RttEmployeur, private service: RttServiceService, private dialog : MatDialog, fb : FormBuilder) {
    this.formModif = fb.group({
      date: [data.date, Validators.required],
      libelle : [data.libelle, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onModif(){
    let rtt : Partial<RttEmployeur> = {
      id : this.data.id,
      date : this.date?.value,
      libelle : this.libelle?.value,
    }
    this.service.httpService.putByid(rtt).subscribe({
      next : value => {
        this.service.shownRtt[this.service.shownRtt.indexOf(this.service.shownRtt.filter((jf) => jf.id == this.data.id)[0])] = value
        this.service.getEntitiesSubject().next(this.service.shownRtt)
        this.dialog.closeAll()
      },
      error : (err) => {
        this.errorMessage = err.error.message
      }
    })
  }

  onAnnulation(){
    this.dialog.closeAll()
  }
  get libelle(){
    return this.formModif.get("libelle")
  }
  get date(){
    return this.formModif.get("date")
  }

}
