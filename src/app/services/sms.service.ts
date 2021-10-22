import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sms } from '../models/Sms';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = "http://10.201.1.91:9001/task-management-tool/employees/multi-sms";
  }

  sendSMS(sms: Sms): Observable<Object> {
    console.log(Sms);
    return this.httpClient.post(`${this.url}`, sms);
  }


  // sendSMS(sms: Sms): Observable<any> {
  //   // send sms api
  //   return this.httpClient.post(`${this.url}`, sms);
  // }
}









