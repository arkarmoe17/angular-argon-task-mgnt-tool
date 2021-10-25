import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeComponent } from 'src/app/components/create-employee/create-employee.component';
import { Pagable } from 'src/app/components/my-paginator/my-paginator.component';

let t;
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeListComponent implements OnInit {
  loading = true
  username = '';
  error: any = null;
  employees: Employee[] = [];
  pagable: Pagable = {
    totalPages: 1,
    currentPage: 0,
    limit: 10,
  }
  totalEmployees: number = 0;

  constructor(private employeeService: EmployeeService, private router: Router, public modalService: NgbModal, public dialog: MatDialog) { }

  // onInit function
  ngOnInit(): void {
    this.username = '';
    this.reloadData();
  }

  reloadData() {
    this.loading = true;
    this.employeeService.getAllEmployeeList(this.username, this.pagable.currentPage, this.pagable.limit).subscribe(data => {
      this.employees = data.result.content;
      this.totalEmployees = data.result.totalElements;
      this.pagable.totalPages = data.result.totalPages;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = error.message;
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error)
      );
  }

  // profile(id: number) {
  //   console.log(id);
  //   this.router.navigate(['profile']);
  // }


  search(username: string) {
    this.pagable.currentPage = 0;
    this.loading = true;
    console.log("username:", username)
    t && clearTimeout(t);
    t = setTimeout(() => this.searchEmployee(username), 800);
  }

  private searchEmployee(username: string) {
    this.employeeService.getAllEmployeeList(username, this.pagable.currentPage, this.pagable.limit).subscribe((data: any) => {
      this.employees = data.result.content;
      this.totalEmployees = data.result.totalElements;
      this.pagable.totalPages = data.result.totalPages;
      this.loading = false;

    })
  }

  openEmployeeModal() {
    const modal = this.dialog.open(
      CreateEmployeeComponent, {
      width: '600px'
    }
    );
    modal.componentInstance.close = () => modal.close();
  }

  // change page
  onChangePage(offset: number) {
    console.log("Offset:", offset)
    document.querySelector('#top')?.scrollIntoView({
      behavior: 'smooth'
    })
    this.pagable.currentPage = offset
    this.reloadData();
  }

  //showing the current total size
  get currentTotalElement() {
    let currentTotalElement = (this.pagable.currentPage + 1) * this.pagable.limit;
    return currentTotalElement >= this.totalEmployees ? this.totalEmployees : currentTotalElement;
  }
}
