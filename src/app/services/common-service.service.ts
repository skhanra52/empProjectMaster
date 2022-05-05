import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http:HttpClient) { }

  getdata(): Observable<any>{

    return this.http.get("http://localhost:3000/employeeDetail");

  }
  addEmployee(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/employeeDetail",data);
  }
}
