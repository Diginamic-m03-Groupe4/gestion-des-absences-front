import { BaseEntity } from "./base-entity";
import { TypeAbsenceEmployeur } from "./type-absence-employeur";

export interface AbsenceEmployeur extends BaseEntity{
  id?: number;
  date : Date;
  type: TypeAbsenceEmployeur;
  libelle: string;
  worked : boolean,

}
