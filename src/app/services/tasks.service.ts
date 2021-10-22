import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  // url = "http://10.201.1.91:9001/task-management-tool/jira-tasks/main-tasks";
  url = "http://10.201.118.4:9001/task-management-tool/jira-tasks/all-main-tasks?";


  constructor(private httpClient: HttpClient) {
  }

  getTaskList(id: number | string): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  //search all near deadline lists
  searchNearDeadline(link: string) {
    return this.httpClient.get(this.url + link);
  }
}
