import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { MyPaginatorComponent } from './my-paginator/my-paginator.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CreateEmployeeComponent,
    MyPaginatorComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    MyPaginatorComponent,
  ]
})
export class ComponentsModule { }
