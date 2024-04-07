import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
  imports: [FormsModule, CommonModule], 
  standalone: true
})
export class NewEmployeeComponent {
  firstName = '';
  lastName = '';
  email = '';
  salary = 0;
  gender = '';

  // Object to hold error messages for each field
  errors = {
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    gender: '',
  };

  constructor(private graphqlService: GraphqlService, private router: Router) {}

  // Validates each field and sets corresponding error messages
  validateFields(): boolean {
    let isValid = true;
    this.errors = { firstName: '', lastName: '', email: '', salary: '', gender: '' }; // Reset errors

    if (!this.firstName) {
      this.errors.firstName = 'First name is required.';
      isValid = false;
    }
    if (!this.lastName) {
      this.errors.lastName = 'Last name is required.';
      isValid = false;
    }
    if (!this.email) {
      this.errors.email = 'Email is required.';
      isValid = false;
    }
    if (this.salary <= 0) {
      this.errors.salary = 'Salary must be greater than 0.';
      isValid = false;
    }
    if (!this.gender) {
      this.errors.gender = 'Gender is required.';
      isValid = false;
    }

    return isValid;
  }

  addEmployee(): void {
    if (!this.validateFields()) {
      console.error('Form validation failed:', this.errors);
      return;
    }

    const employeeInput = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      salary: this.salary,
      gender: this.gender,
    };

    this.graphqlService.addEmployee(employeeInput).subscribe({
      next: (response: any) => {
        console.log('Employee added', response.data.addEmployee);
        // Optionally reset form fields and navigate away or refresh the list
        this.resetForm();
        this.navigateToEmployeeList();
      },
      error: (error) => {
        console.error('Error adding employee', error);
      },
    });
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.salary = 0;
    this.gender = '';
    this.errors = { firstName: '', lastName: '', email: '', salary: '', gender: '' };
  }

  navigateToEmployeeList() {
    this.router.navigate(['/employee-list']);
  }
}