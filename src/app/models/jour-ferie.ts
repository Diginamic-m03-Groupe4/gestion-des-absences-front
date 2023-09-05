import { BaseEntity } from "./base-entity";
import { EnumFerie } from "./enum-ferie";
import { StatusAbsenceEmployeur } from "./status-absence-employeur";

export interface JourFerie extends BaseEntity {
    libelle : EnumFerie,
    worked : boolean,
    date :Date,
    statutAbsenceEmployeur : StatusAbsenceEmployeur
}


