import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Task } from '../../models/tasks';
import { TaskService } from 'src/app/services/tasks.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { SmsModalComponent } from '../sms-modal/sms-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from '../email-modal/email-modal.component';
import { Pagable } from 'src/app/components/my-paginator/my-paginator.component';

let t;
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})

export class TablesComponent implements OnInit {

  loading = true;
  link: any = ''
  data: any = {
    userName: '',
    issueStatus: '',
    dueDate: ''
  };
  pagable: Pagable = {
    totalPages: 1,
    currentPage: 0,
    limit: 20,
  }
  totalTasks: number = 0;
  error: any = null;
  selectedUser: string = '';
  selectedTask: string = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router, private employeeService: EmployeeService, public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAllTasks(this.data);
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

  getAllTasks(formdata: any) {
    this.loading = true;
    this.data = formdata;
    console.log("Data:", this.data);

    let dueDate = '';
    if (this.data.dueDate) {
      let d = formdata.dueDate
      dueDate = `${d.year}-${d.month}-${d.day}`;
      console.log("dueDate:", dueDate)
    }
    this.link = 'userName=' + this.data.userName + '&issueStatus=' + this.data.issueStatus + '&dueDate=' + dueDate + "&offset=" + this.pagable.currentPage + "&limit=" + this.pagable.limit;
    this.taskService.searchNearDeadline(this.link).subscribe((data: any) => {
      this.tasks = data.result.content;
      this.totalTasks = data.result.totalElements;
      this.pagable.totalPages = data.result.totalPages;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = error.message;
    })
  }


  // search 
  search(fromdata: any) {
    this.loading = true;
    this.pagable.currentPage = 0;
    t && clearTimeout(t);
    t = setTimeout(() => this.getAllTasks(fromdata), 800);
  }


  // change page
  onChangePage(offset: number) {
    console.log("Offset:", offset)
    document.querySelector('#top')?.scrollIntoView({
      behavior: 'smooth'
    })
    this.pagable.currentPage = offset
    this.getAllTasks(this.data);
  }

  //showing the current total size
  get currentTotalElement() {
    let currentTotalElement = (this.pagable.currentPage + 1) * this.pagable.limit;
    return currentTotalElement >= this.totalTasks ? this.totalTasks : currentTotalElement;
  }

}
