import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/tasks';
import { TaskService } from 'src/app/tasks.service';
import { EmployeeService } from 'src/app/employee.service';
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
  selectedUser: string = '';
  selectedTask: string = '';
  tasks: Observable<Task[]>;
  constructor(private taskService: TaskService, private router: Router, private employeeService: EmployeeService, public modalService: NgbModal) {
  }
  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.taskService.getTaskList().subscribe(data => {
      this.tasks = data.result;
      console.log(this.tasks);
    });
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
  openSmsModal() {
    const modalRef = this.modalService.open(SmsModalComponent);
    modalRef.componentInstance.user = this.tasks;
    modalRef.result.then((result) => {
      if (result) {
        console.log(this.tasks);
      }
    });
  }
  openEmailModal() {
    const modalRef = this.modalService.open(EmailModalComponent);
    modalRef.componentInstance.user = this.tasks;
    modalRef.result.then((result) => {
      if (result) {
        console.log(this.tasks);
      }
    });
  }
  link: any = ''
  userName: any;
  issueStatus: string;
  dueDate: any;
  abcd: any;
  search(formdata: Form) {
    // console.log(formdata);
    this.abcd = formdata;
    console.log(this.abcd);
    this.link = 'userName=' + this.abcd.userName + '&issueStatus=' + this.abcd.issueStatus + '&dueDate=' + this.abcd.dueDate
    console.log(this.link);

    this.taskService.searchNearDeadline(this.link).subscribe((data: any) => {
      this.tasks = data.result;

    })
  }
}
