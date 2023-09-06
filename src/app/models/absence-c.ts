export class AbsenceC {
  public dateDebut: Date;
  public dateFin: Date;
  constructor(public id : number | undefined, public motif: string, public status: string, public typeConge: string, dateDebut: string, dateFin: string) {
    this.dateDebut = new Date(dateDebut);
    this.dateFin = new Date(dateFin);
  }
}
