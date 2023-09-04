import { BaseEntity } from "./base-entity";
import { StatusAbsenceEmployeur } from "./status-absence-employeur";

export interface RttEmployeur extends BaseEntity {
  date : Date;
  libelle : string;
  statusAbsenceEmployeur : StatusAbsenceEmployeur;
}
