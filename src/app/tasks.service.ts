import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  url = "http://10.201.1.91:9001/task-management-tool/jira-tasks/main-tasks";
  byUserName = "http://10.201.1.91:9001/task-management-tool/jira-tasks/all-main-tasks?";


  constructor(private httpClient: HttpClient) {
  }

  getTask(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`);
  }
  // getting task list from API
  getTaskList(): Observable<any> {
    let param: any = { 'offset': 0, 'limit': 100 };
    console.log(this.httpClient.get(`${this.url}`));
    return this.httpClient.get(`${this.url}`, { params: param });
  }

  searchNearDeadline(link: string) {
    // let params: any = {};
    // if (userName) {
    //   params.userName = JSON.stringify(userName)
    // }
    // if (issueStatus) {
    //   params.issueStatus = JSON.stringify(issueStatus)
    // }
    // if (dueDate) {
    //   params.dueDate = JSON.stringify(dueDate)
    // }
    // console.log(JSON.stringify(userName));


    return this.httpClient.get(this.byUserName + link);
  }
}
