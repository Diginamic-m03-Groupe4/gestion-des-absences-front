import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TypeButton } from './tableau-buttons';

@Injectable({
  providedIn: 'root'
})
export abstract class TabService<T> {

  private entitiesSubject:Subject<T[]> = new Subject();

  constructor() { }

  getEntitiesSubject() {
    return this.entitiesSubject;
  }

  abstract handleTabSignal(signal:TypeButton, entity?:any) : void;

  abstract mapToPresentation(entity:T[]):string[][];
}
