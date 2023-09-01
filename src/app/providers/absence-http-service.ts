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

  constructor(private http:HttpClient) {}


  get(annee : number){
    return this.http.get<Absence[]>(this.URL_API_V1_ABSENCE+'?annee=' + annee)
  }


  getByid(id : string){
    let newURL = this.URL_API_V1_ABSENCE_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.get<Absence>(newURL)
  }


  post(absenceDto : Absence){
    return this.http.post<any>(this.URL_API_V1_ABSENCE, absenceDto)
  }


  putByid(id : string, absenceDto : Absence){
    let newURL = this.URL_API_V1_ABSENCE_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.put<string>(newURL, absenceDto)
  }


  deleteByid(id : string){
    let newURL = this.URL_API_V1_ABSENCE_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.delete<string>(newURL)
  }

}
