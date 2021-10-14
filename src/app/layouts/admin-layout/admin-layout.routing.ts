import { Routes } from '@angular/router';

import { TablesComponent } from '../../pages/tables/tables.component';
import { EmployeeListComponent } from 'src/app/pages/employee-list/employee-list.component';
import { CreateEmployeeComponent } from 'src/app/pages/create-employee/create-employee.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'tasks' },
    { path: 'tasks', component: TablesComponent },
    { path: 'employee', component: EmployeeListComponent },
    { path: 'create-employee', component: CreateEmployeeComponent },

];
