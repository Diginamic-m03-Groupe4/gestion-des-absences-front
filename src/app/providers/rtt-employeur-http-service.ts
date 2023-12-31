import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RttEmployeur } from '../models/rtt-employeur';


@Injectable({
  providedIn: 'root'
})
export class RTTEmployeurHttpService {

  private URL_API_V1_ADMIN = environment.baseUrl + "/api/v1/admin";
  private URL_API_V1_ADMIN_ID = environment.baseUrl + "/api/v1/admin/{id}";

  constructor(private http:HttpClient) {}


  get(annee: number){
    return this.http.get<RttEmployeur[]>(this.URL_API_V1_ADMIN + "?annee="+annee, {withCredentials: true})
  }


  getByid(id : string){
    let newURL = this.URL_API_V1_ADMIN_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.get<RttEmployeur>(newURL, {withCredentials: true})
  }


  post(rttEmployeurDTOs : Partial<RttEmployeur>[]){
    return this.http.post<RttEmployeur[]>(this.URL_API_V1_ADMIN, rttEmployeurDTOs, {withCredentials: true})
  }


  putByid(rttEmployeurDTO : Partial<RttEmployeur>){
    return this.http.put<RttEmployeur>(this.URL_API_V1_ADMIN, rttEmployeurDTO, {withCredentials: true})
  }


  deleteByid(id : string){
    let newURL = this.URL_API_V1_ADMIN_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.delete<string>(newURL, {withCredentials: true})
  }

}
