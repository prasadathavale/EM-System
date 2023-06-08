import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ManagerComponent } from './components/manager/manager.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginPageComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'employee',
        loadChildren: () => import('./modules/employees/employee/employee.module')
        .then(m => m.EmployeeModule)
      },
      {
        path: 'manager',
        component: ManagerComponent
      }
    ]
  },
  { path:'**', redirectTo:'/home/employee',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
