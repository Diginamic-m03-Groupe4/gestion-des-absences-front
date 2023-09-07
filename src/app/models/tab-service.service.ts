import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TableauButton } from './tableau-buttons';

@Injectable({
  providedIn: 'root'
})
export abstract class TabService<T> {

  private entitiesSubject:Subject<T[]> = new Subject();

  constructor() { }

  getEntitiesSubject() {
    return this.entitiesSubject;
  }

  abstract handleTabSignal(signal:TableauButton, entity?:any) : void;

  abstract mapToPresentation(entity:T[]):string[][];
}
