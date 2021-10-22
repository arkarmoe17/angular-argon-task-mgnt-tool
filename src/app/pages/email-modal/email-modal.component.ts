import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/email.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.css']
})
export class EmailModalComponent implements OnInit {
  submitted = false;
  email:Email = new Email();
  constructor(public activeModal: NgbActiveModal, private router: Router, private emailService: EmailService,private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  sendSmsToMember() {
    this.submitted = true;
  
    this.email.informType='EMAIL';
    this.email.cc=[];
    this.email.content='';
    this.email.employeeIds=[];
  
    this.emailService.sendSMS(this.email).subscribe(data => {
      console.log(data);
      // console.log(InformType);
      // this.sms = new Sms();
    },
      error => console.log(error)
    );
  }
}
