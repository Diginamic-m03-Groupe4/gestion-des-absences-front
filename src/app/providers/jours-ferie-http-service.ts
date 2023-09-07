import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JourFerie } from '../models/jour-ferie';


@Injectable({
  providedIn: 'root'
})
export class JoursFerieHttpService {

  private URL_API_V1_JOURS_FERIES = environment.baseUrl + "/api/v1/jours-feries";

  constructor(private http:HttpClient) {}


  get(annee : number){
    return this.http.get<JourFerie[]>(this.URL_API_V1_JOURS_FERIES+'?annee=' + annee, {withCredentials: true})
  }


  put(jourFerie : any){
    return this.http.put<JourFerie>(this.URL_API_V1_JOURS_FERIES, jourFerie, {withCredentials: true})
  }

}
