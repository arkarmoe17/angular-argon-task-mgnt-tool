import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeInfo } from 'src/app/models/EmployeeInfo';
@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css']
})
export class TagInputComponent implements OnInit {
  @Output() changeEmployeeIds = new EventEmitter<any>();

  employees: [];
  dropdownList = [];
  selectedItems = [];
  content = "";
  dropdownSettings: IDropdownSettings;
  employeeIds: number[];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeIds = new Array();
    this.reloadData();

    this.selectedItems = [
      // this.content = (<HTMLInputElement>document.getElementById("content")).value
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  reloadData() {
    this.employeeService.getAllEmployeeList('', 0, 100).subscribe(data => {
      this.employees = data.result.content;
      this.dropdownList = this.employees;
      console.log("log customer", this.employees);
    });
  }

  onItemSelect(item: EmployeeInfo) {
    console.log("item select function: ", item);
    this.employeeIds.push(item.id);
    console.log("employeeIds: ", this.employeeIds);
    this.changeEmployeeIds.emit(this.employeeIds);
    console.log("finish call changeEmployeeIds");
  }

  onSelectAll(items: any) {
    console.log("select all function: ", items);
  }
  onDeSelect(item: EmployeeInfo) {
    const index = this.employeeIds.indexOf(item.id, 0);

    if (index > -1) {
      this.employeeIds.splice(index, 1);
    }
    console.log("employeeIds: ", this.employeeIds);
  }
}
