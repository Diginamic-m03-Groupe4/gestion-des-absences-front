import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Absence } from '../models/absence';


@Injectable({
  providedIn: 'root'
})
export class AbsenceHttpService {

  private URL_API_V1_ABSENCE = environment.baseUrl + "/api/v1/absence";
  private URL_API_V1_ABSENCE_ID = environment.baseUrl + "/api/v1/absence/{id}";
  private URL_API_V1_ABSENCE_DEMANDE = environment.baseUrl + "/api/v1/absence/demandes";
  private URL_API_V1_ABSENCE_DEMANDE_REFUSED = environment.baseUrl + "/api/v1/absence/demandes/refused";
  private URL_API_V1_ABSENCE_DEMANDE_VALIDATED = environment.baseUrl + "/api/v1/absence/demandes/validated";

  constructor(private http:HttpClient) {}


  get(annee : number){
    return this.http.get<Absence[]>(this.URL_API_V1_ABSENCE+'?annee=' + annee, {withCredentials: true})
  }

  getByid(id : string){
    let newURL = this.URL_API_V1_ABSENCE_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.get<Absence>(newURL, {withCredentials: true})
  }

  post(absenceDto : Absence){
    return this.http.post<any>(this.URL_API_V1_ABSENCE, absenceDto, {withCredentials: true})
  }

  postDemandeValidatedId(id : number){
    return this.http.post<string>(this.URL_API_V1_ABSENCE_DEMANDE_VALIDATED + `?absenceId=${id}`, {},{withCredentials: true})
  }

  postDemandeRefusedId(id : number){
    return this.http.post<string>(this.URL_API_V1_ABSENCE_DEMANDE_REFUSED + `?absenceId=${id}`, {},{withCredentials: true})
  }

  putByid(id : string, absenceDto : Absence){
    let newURL = this.URL_API_V1_ABSENCE_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.put<string>(newURL, absenceDto,{withCredentials: true})
  }

  deleteByid(id : string){
    let newURL = this.URL_API_V1_ABSENCE_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.delete<string>(newURL ,{withCredentials: true})
  }

  getDemande(){
    return this.http.get<Absence[]>(this.URL_API_V1_ABSENCE_DEMANDE, {withCredentials: true})
  }

}
