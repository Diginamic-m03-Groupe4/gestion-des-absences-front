import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { JourFerie } from 'src/app/models/jour-ferie';
import { JfServiceService } from 'src/app/pages/rtt-tab-manager/providers/jf-service.service';

@Component({
  selector: 'app-modal-modif-jf',
  templateUrl: './modal-modif-jf.component.html',
  styleUrls: ['./modal-modif-jf.component.scss']
})
export class ModalModifJFComponent implements OnInit{

  messageModif = "";
  errorMessage = "";

  constructor( @Inject(MAT_DIALOG_DATA) private data: JourFerie, private service: JfServiceService, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.messageModif = `Voulez-vous marqué ce jour comme${(this.data.worked) ? " non" : ""} travaillé?`
  }

  onModif(){
    this.service.httpService.put(this.data).subscribe({
      next : value => {
        this.service.shownJf[this.service.shownJf.indexOf(this.service.shownJf.filter((jf) => jf.id == this.data.id)[0])] = value
        this.service.getEntitiesSubject().next(this.service.shownJf)
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
}
