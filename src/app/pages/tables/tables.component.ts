import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/tasks';
import { TaskService } from 'src/app/services/tasks.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { SmsModalComponent } from '../sms-modal/sms-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from '../email-modal/email-modal.component';
import { Form } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})

export class TablesComponent implements OnInit {

  link: any = ''
  userName: any = '';
  issueStatus: string = '';
  dueDate: any = '';
  data: any = {
    userName: '',
    issueStatus: '',
    dueDate: ''
  };

  selectedUser: string = '';
  selectedTask: string = '';
  tasks: Observable<Task[]>;
  constructor(private taskService: TaskService, private router: Router, private employeeService: EmployeeService, public modalService: NgbModal) {
  }
  ngOnInit(): void {
    this.search(this.data);
  }

  profile(id: number) {
    console.log(id);
    this.router.navigate(['profile', id]);
  }
  //event handler for the select element's change event
  selectChangeUser(event: any) {
    //update the ui
    this.selectedUser = event.target.value;
  }
  //event handler for the select element's change event
  selectChangeTask(event: any) {
    //update the ui
    this.selectedTask = event.target.value;
  }

  //sms modal
  openSmsModal() {
    const modalRef = this.modalService.open(SmsModalComponent);
    modalRef.componentInstance.user = this.tasks;
    modalRef.result.then((result) => {
      if (result) {
        console.log(this.tasks);
      }
    });
  }

  //email modal
  openEmailModal() {
    const modalRef = this.modalService.open(EmailModalComponent);
    modalRef.componentInstance.user = this.tasks;
    modalRef.result.then((result) => {
      if (result) {
        console.log(this.tasks);
      }
    });
  }

  search(formdata: any) {
    this.data = formdata;
    console.log("Data:", this.data);

    let dueDate = '';
    if (this.data.dueDate) {
      let d = formdata.dueDate
      dueDate = `${d.year}-${d.month}-${d.day}`;
      console.log("dueDate:", dueDate)
    }
    this.link = 'userName=' + this.data.userName + '&issueStatus=' + this.data.issueStatus + '&dueDate=' + dueDate + "&offset=0&limit=30"
    console.log("link data:", this.link);
    this.taskService.searchNearDeadline(this.link).subscribe((data: any) => {
      this.tasks = data.result.content;
    })
  }
}
