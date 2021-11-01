import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @Input() close!: Function;
  @Input() reload!: Function;


  formGroup !: FormGroup;
  error = false;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.pattern('[0-9]{6,12}')]],
      position: ['',],
      vmyCode: ['',],
      department: ['',],
      email: ['', [Validators.email]],
    });
  }

  get name() { return this.formGroup.get("name"); }

  get userName() { return this.formGroup.get("userName"); }

  get email() { return this.formGroup.get("email") }

  get phoneNumber() { return this.formGroup.get("phoneNumber") }

  onSubmit() {
    this.error = false;
    this.name?.markAsDirty();
    this.userName?.markAsDirty();
    this.phoneNumber?.markAsDirty();
    this.email?.markAsDirty();
    if (!this.formGroup.valid) return;
    console.log("form :", this.formGroup.value)
    this.employeeService.createEmployee(this.formGroup.value)
      .subscribe(() => {
        this.close();
        this.reload();
      }, error => {
        this.error = true
        console.error("submition fail.")
      });
  }



}
