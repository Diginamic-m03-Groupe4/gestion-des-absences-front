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


  get(){
    return this.http.get<any>(this.URL_API_V1_ADMIN)
  }


  getByid(id : string){
    let newURL = this.URL_API_V1_ADMIN_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.get<any>(newURL)
  }


  post(rttEmployeurDTO : any){
    return this.http.post<any>(this.URL_API_V1_ADMIN, rttEmployeurDTO)
  }


  putByid(rttEmployeurDTO : RttEmployeur, id : string){
    let newURL = this.URL_API_V1_ADMIN_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.put<string>(newURL, rttEmployeurDTO)
  }


  deleteByid(id : string){
    let newURL = this.URL_API_V1_ADMIN_ID;
    newURL = newURL.replace('{id}', id);
    return this.http.delete<string>(newURL)
  }

}
