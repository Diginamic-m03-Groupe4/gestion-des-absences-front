import { Absence } from "./absence";
import { CaseAbsence } from "./case-absence";
import { Employee } from "./employee";
import { StatusAbsence } from "./status-absence";

export class EmployeeC {

  public absenceMap : Map<string, CaseAbsence> = new Map();
  public id: number | undefined;
  public email: string;
  public nom: string;
  public prenom: string;
  public absences: Absence[];
  public nombresJoursRestantsCP: number;
  public nombresJoursRestantsRTT: number;

  constructor(employee : Employee){

    this.id = employee.id;
    this.email = employee.email;
    this.nom = employee.nom;
    this.prenom = employee.prenom;
    this.absences = employee.absences;
    this.nombresJoursRestantsCP = employee.nombresJoursRestantsCP;
    this.nombresJoursRestantsRTT = employee.nombresJoursRestantsRTT;

    for (let absence of employee.absences) {
      let dateDebut = new Date(absence.dateDebut);
      let dateFin = new Date(absence.dateFin);
      let displayedLetter = (absence.status == StatusAbsence.ATTENTE_VALIDATION) ? "AV" : "V";
      for(let date = dateDebut; date <= dateFin; date.setDate(date.getDate() + 1)){

        this.absenceMap.set(date.toLocaleDateString() , {absencePointer : absence, displayedLetter : displayedLetter});
      }
    }
  }
}
