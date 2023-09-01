import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  private _baseUrl = 'http://localhost:8080/api/v1/absence';

  constructor(private _http: HttpClient) { }

  public findAll() {
    return this._http.get(this._baseUrl+'?annee=2023');
  }

}
