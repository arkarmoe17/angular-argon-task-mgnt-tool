import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { MessageService } from './message.service';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  url = "http://10.201.1.91:9001/task-management-tool/employees/lists";
  getUrl = "http://10.201.1.91:9001/task-management-tool/employees/username?userName=";
  newEmployee = "http://10.201.1.91:9001/task-management-tool/employees/";

  constructor(private httpClient: HttpClient) {
  }

  getEmployee(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`);
  }
  // create employee 
  createEmployee(data: any) {
    return this.httpClient.post(this.newEmployee, data);
  }
  // update employee phase 2
  updateEmployee(id: number, value: any): Observable<Object> {
    return this.httpClient.put(`${this.url}/${id}`, value);
  }
  // delete employee phase 2
  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  // getting employee list from API
  getEmployeeList(): Observable<any> {
    let param: any = { 'offset': 0, 'limit': 100 };

    console.log(this.httpClient.get(`${this.url}`));
    return this.httpClient.get(`${this.url}`, { params: param });
  }

  getUsername(name: any) {
    let params: any = {};
    if (name) {
      params.name = name
    }
    return this.httpClient.get(this.getUrl + name);
  }
}
