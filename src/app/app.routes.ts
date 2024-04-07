import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'; 
import { SignupComponent } from './signup/signup.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'employee-list', component: EmployeeListComponent, title: 'Employee List' },
  { path: 'signup', component: SignupComponent, title: 'Signup' }, 
  { path: 'new-employee', component: NewEmployeeComponent, title: 'New Employee'},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];