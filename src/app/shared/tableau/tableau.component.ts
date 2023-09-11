import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from "rxjs";
import { BaseEntity } from 'src/app/models/base-entity';
import { TabService } from 'src/app/models/tab-service.service';
import { TypeButton } from 'src/app/models/tableau-buttons';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent<T extends BaseEntity> implements OnInit, OnChanges, OnDestroy {

  presentationItems: string[][] =  [];
  shownPresentationItems: Subject<string[][]> = new Subject();
  tabNotification = TypeButton;
  tabEntities : Object[] = [];
  Tsubscription:Subscription = new Subscription();
  formSearch:FormGroup;

  @Input() enTetes:string[] | undefined =[];
  @Input() service?: TabService<T>;
  @Input() entities?: T[];
  @Input() buttons?: TypeButton[];
  @Input() permission = false;
  subEntites: Subscription | undefined;
  constructor(private fb:FormBuilder) {
    this.formSearch = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillTableau(this.entities);
  }

  ngOnInit(): void {
    this.shownPresentationItems.subscribe(value =>{
      this.presentationItems = value;
    })
    this.subEntites = this.service?.getEntitiesSubject().subscribe(value => {
      this.entities = value
      this.fillTableau(this.entities);
    });
  }

  createInputFields(tabEntity:Object){
    for(let key of Object.keys(tabEntity)){
      this.formSearch.addControl(key, new FormControl('', []));
    }
  }

  fillTableau(entities:any[]|undefined) {
    if(entities != undefined && this.service != undefined){
      this.presentationItems = this.service?.mapToPresentation(entities);
      this.shownPresentationItems.next(this.presentationItems);
    }
  }

  sendNotification(notification:TypeButton, id:number | null = null){
    if(this.service != undefined){
      if(this.entities != undefined && id != null){
        this.service.handleTabSignal(notification, this.entities[id]);
      } else {
        console.log("error");
      }
    }
  }

  handleAjout(){
    let entity:any = {};
    if(this.entities != undefined){
      this.service?.handleTabSignal(TypeButton.AJOUT, entity);
    }
  }


  search(index:number, $event:any){
    this.shownPresentationItems.next(this.presentationItems
                                     .filter(item => item[index].includes(""+$event)))
  }

  ngOnDestroy(): void {
    this.shownPresentationItems.unsubscribe();
    this.subEntites?.unsubscribe();
  }
}

