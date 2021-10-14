import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<Employee[]>;
  constructor(private employeeService: EmployeeService, private router: Router, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data.result.content;
      console.log(this.employees);
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
  profile(id: number) {
    console.log(id);
    this.router.navigate(['profile']);
  }

  username: any;
  search() {
    this.employeeService.getUsername(this.username).subscribe((data: any) => {
      this.employees = data.result;
    })
  }

}
