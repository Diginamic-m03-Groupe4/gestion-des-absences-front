import { BaseEntity } from "./base-entity";

export interface EmployeCreation extends BaseEntity {
  email: string;
  nom: string;
  prenom: string;
  password: string;

}
