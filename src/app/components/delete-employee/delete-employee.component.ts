import { Component, Input } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent {

  @Input() id !: number
  @Input() close !: Function
  @Input() reload !: Function

  constructor(private employeeService: EmployeeService) { }

  confirm() {
    console.log("confirming to you.", this.id)
    this.employeeService.deleteEmployee(this.id)
      .subscribe(() => {
        this.close()
        this.reload()
      }, error => {
        console.error("Delete employee fail.")
        this.close()
      })
  }
}
