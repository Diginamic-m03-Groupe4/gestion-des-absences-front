import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ListAbsByEmployeeHttpService {
  private URL_API_V1_DATAHISTOGRAM_ID =
    environment.baseUrl + '/api/v1/datahistogram/{id}';

  constructor(private http: HttpClient) {}

  get(departementId: string) {
    let newURL = this.URL_API_V1_DATAHISTOGRAM_ID;
    newURL = newURL.replace('{id}', departementId);
    return this.http.get(newURL, { withCredentials: true });
  }
}
