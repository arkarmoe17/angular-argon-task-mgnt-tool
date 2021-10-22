import { Routes } from '@angular/router';

import { TablesComponent } from '../../pages/tables/tables.component';
import { EmployeeListComponent } from 'src/app/pages/employee-list/employee-list.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'tasks' },
    { path: 'tasks', component: TablesComponent },
    { path: 'employee', component: EmployeeListComponent },
];
