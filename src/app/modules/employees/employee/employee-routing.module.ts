import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddEmployeeComponent } from 'src/app/components/add-employee/add-employee.component';
import { EmployeeComponent } from 'src/app/components/employee/employee.component';

const routes: Routes = [
  {path:'',component:EmployeeComponent},
  // { path:'addEmployee',component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
