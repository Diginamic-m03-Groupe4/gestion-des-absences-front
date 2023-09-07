import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmployeCreation } from '../models/employe-creation';
import { Login } from '../models/login';
import { Employee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeHttpService {

  private URL_API_V1_EMPLOYEE_LOGIN = environment.baseUrl + "/api/v1/employee/login";
  private URL_API_V1_EMPLOYEE_SIGNIN = environment.baseUrl + "/api/v1/employee/signin";
  private URL_API_V1_EMPLOYEE_DEPARTEMENT = environment.baseUrl + "/api/v1/employee/departement";

  constructor(private http:HttpClient) {}


  postLogin(loginDto : Login){
    return this.http.post(this.URL_API_V1_EMPLOYEE_LOGIN, loginDto, {withCredentials: true})
  }


  postSignUp(utilisateur : EmployeCreation){
    return this.http.post(this.URL_API_V1_EMPLOYEE_SIGNIN, utilisateur, {withCredentials: true})
  }

  getByDepartement(){
    return this.http.get<Employee[]>(this.URL_API_V1_EMPLOYEE_DEPARTEMENT, {withCredentials: true})
  }

}
