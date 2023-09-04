import { BaseEntity } from "./base-entity";
import { StatusAbsence } from "./status-absence";
import { TypeConge } from "./type-conge";

export interface Absence extends BaseEntity {
  dateDebut: Date;
  dateFin: Date;
  motif: string;
  status: StatusAbsence;
  typeConge: TypeConge;
  email: string;

}

export interface AbsencePresentation {
  dateDebut: string;
  dateFin: string;
  motif: string;
  status: string;
}
