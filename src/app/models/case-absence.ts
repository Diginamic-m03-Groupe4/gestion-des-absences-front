import { Absence } from "./absence"
import { JourFerie } from "./jour-ferie"
import { RttEmployeur } from "./rtt-employeur"

export type CaseAbsence = {
  absencePointer : Absence | JourFerie | RttEmployeur | null,
  displayedLetter : string
}
