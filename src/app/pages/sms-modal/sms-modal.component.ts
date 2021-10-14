import { Component, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sms } from 'src/app/Sms';
import { TagInputComponent } from './tag-input/tag-input.component';
import { SmsService } from 'src/app/sms.service';
import { TaskService } from 'src/app/tasks.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/employee';
import { EmployeeInfo } from 'src/app/models/EmployeeInfo';


@Component({
  selector: 'app-sms-modal',
  templateUrl: './sms-modal.component.html',
  styleUrls: ['./sms-modal.component.css']
})
export class SmsModalComponent {
  @Input() employeeIds;
  @ViewChild(TagInputComponent) taginput: TagInputComponent;

  // employeeIds : number[];
  sms: Sms = new Sms();
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private router: Router, private taskService: TaskService, private smsService: SmsService, private fb: FormBuilder) { }
  newID = [];

  ngOnInit(): void {
    // console.log(this.sms.employeeIds);
  }



  employeeIdsEvent(employeeIds: any) {
    this.sms.employeeIds = employeeIds;
  }

  sendSmsToMember() {

    this.sms.informType = 'SMS';
    // this.submitted = true;
    // this.sms.cc=[];
    // this.sms.content='';
    // this.sms.employeeIds=[];

    this.smsService.sendSMS(this.sms).subscribe(data => {
      console.log(data);
      window.alert("Message was sent successfully !!!!!!");

      // console.log(InformType);
      // this.sms = new Sms();
    },
      error => console.log(error)
    );
  }

}

