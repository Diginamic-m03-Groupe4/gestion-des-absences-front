import { BaseEntity } from "./base-entity";
import { StatusAbsence } from "./status-absence";
import { TypeConge } from "./type-conge";

export interface Absence extends BaseEntity {
  dateDebut: string;
  dateFin: string;
  motif: string;
  status: StatusAbsence;
  typeConge: TypeConge;
}

export interface AbsencePresentation {
  dateDebut: string;
  dateFin: string;
  motif: string;
  status: string;
}
