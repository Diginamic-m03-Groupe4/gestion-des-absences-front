import { Absence } from "./absence";
import { Role } from "./role";

export interface Employee {
  id?: number;
  email: string;
  nom: string;
  prenom: string;
  role: Role[];
  absences: Absence[];
  nombresJoursRestantsCP: number;
  nombresJoursRestantsRTT: number;

}
