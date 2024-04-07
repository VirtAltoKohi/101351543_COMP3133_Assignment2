import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../graphql.service';

interface Employee {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  salary: number;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = []; 
  selectedEmployee: Employee | null = null;
  selectedEmployeeForDetails: Employee | null = null;

  constructor(private graphqlService: GraphqlService, private router: Router) {}

  ngOnInit(): void {
    this.graphqlService.getAllEmployees().subscribe({
      next: (data: any) => { 
        this.employees = data;
      },
      error: (error) => {
        console.error('Error fetching employees', error);
      }
    });
  }

  showDetails(employee: Employee): void {
    this.selectedEmployeeForDetails = employee;
  }

  deleteEmployee(employeeId: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.graphqlService.deleteEmployee(employeeId).subscribe({
        next: (response: any) => { 
          console.log('Employee deleted', response.data.deleteEmployee);
          this.employees = this.employees.filter(employee => employee._id !== employeeId);
        },
        error: (error) => {
          console.error('Error deleting employee', error);
        },
      });
    }
  }

  showUpdateForm(employee: Employee): void {
    this.selectedEmployee = { ...employee }; 
  }

  cancelUpdate(): void {
    this.selectedEmployee = null;
  }

  updateEmployee(): void {
    if (!this.selectedEmployee) return;

    const updateInput = {
      first_name: this.selectedEmployee.first_name,
      last_name: this.selectedEmployee.last_name,
      email: this.selectedEmployee.email,
      gender: this.selectedEmployee.gender,
      salary: this.selectedEmployee.salary,
    };

    this.graphqlService.updateEmployee(this.selectedEmployee._id, updateInput).subscribe({
      next: (response: any) => { 
        console.log('Employee updated', response.data.updateEmployee);
        this.ngOnInit(); 
        
        this.selectedEmployee = null;
      },
      error: (error) => {
        console.error('Error updating employee', error);
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToEmployeeCreate() {
    this.router.navigate(['/new-employee']);
  }
}