import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { Task } from '../../../models/tasks';
import { TaskService } from 'src/app/services/tasks.service';

@Component({
  selector: 'dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.css']
})
export class DropdownInputComponent implements OnInit {

  @Output() taskStatus = new EventEmitter<any>();

  employees: [];
  dropdownList = [];
  selectedItems = [];
  content = "";
  dropdownSettings: IDropdownSettings;
  tasks: any;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
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
    this.taskService.getTaskList('').subscribe(data => {
      this.employees = data.result.content;
      this.dropdownList = this.employees;
      console.log("log customer", this.employees);
    });
  }

  onItemSelect(item: Task) {
    console.log("item select function: ", item);
    this.tasks.push(item.issueStatus);
    console.log("employeeIds: ", this.tasks);
    this.taskStatus.emit(this.tasks);
    console.log("finish call changeEmployeeIds");
  }

  onSelectAll(items: any) {
    console.log("select all function: ", items);
  }
  onDeSelect(item: Task) {
    const index = this.tasks.indexOf(item.issueStatus, 0);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    console.log("employeeIds: ", this.tasks);
  }
}
