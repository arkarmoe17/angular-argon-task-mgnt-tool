import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = "http://10.201.118.7:9991/task-management-tool/employees/multi-sms";
  }

  sendSMS(email: Email): Observable<Object>{
    console.log(Email);
    return this.httpClient.post(`${this.url}`, email);
  }

}
