import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SmsModalComponent } from './pages/sms-modal/sms-modal.component';
import { EmailModalComponent } from './pages/email-modal/email-modal.component';
import { TagInputComponent } from './pages/sms-modal/tag-input/tag-input.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { DropdownInputComponent } from './pages/tables/dropdown-input/dropdown-input.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    TagInputModule,
    NgMultiSelectDropDownModule,
    AngularMultiSelectModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    EmployeeListComponent,
    SmsModalComponent,
    EmailModalComponent,
    TagInputComponent,
    CreateEmployeeComponent,
    DropdownInputComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
