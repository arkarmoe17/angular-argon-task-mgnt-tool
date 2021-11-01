import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { MessageService } from './message.service';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  url = "http://10.201.118.4:9001/task-management-tool/employees";
  newEmployee = "http://10.201.1.91:9001/task-management-tool/employees";

  constructor(private httpClient: HttpClient) {
  }

  // getting employee list from API
  getAllEmployeeList(username: string, offset: number, limit: number): Observable<any> {
    let param: any = { 'username': username, 'offset': offset, 'limit': limit };
    return this.httpClient.get(`${this.url}/lists`, { params: param });
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



}
