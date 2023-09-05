import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { JourFerie } from 'src/app/models/jour-ferie';
import { RttTabService } from 'src/app/pages/rtt-tab-manager/providers/rtt-tab.service';

@Component({
  selector: 'app-modal-modif-jf',
  templateUrl: './modal-modif-jf.component.html',
  styleUrls: ['./modal-modif-jf.component.scss']
})
export class ModalModifJFComponent implements OnInit{

  messageModif = "";

  constructor( @Inject(MAT_DIALOG_DATA) private data: JourFerie, private service: RttTabService, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.messageModif = `Voulez-vous marqué ce jour comme${(this.data.worked) ? " non" : ""} travaillé?`
  }

  onModif(){
    this.service.modifierJF(this.data);
    this.dialog.closeAll()
  }

  onAnnulation(){
    this.dialog.closeAll()
  }
}
