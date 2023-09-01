import { Absence } from "./absence";

export interface Employee {
  id?: number;
  email: string;
  nom: string;
  prenom: string;
  role: any;
  absences: Absence[];
  nombresJoursRestantsCP: number;
  nombresJoursRestantsRTT: number;

}
