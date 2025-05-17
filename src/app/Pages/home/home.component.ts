import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../../Core/interfaces/employee';
import { EmployeesService } from '../../Core/services/employees/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  editingId: number | null = null;

  addNewEmployee: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('', [Validators.required]),
    salary: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  constructor(
    private empService: EmployeesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.empService.getAll().subscribe({
      next: (res) => (this.employees = res),
      error: (err) => {
        console.error('Failed to fetch employees:', err);
        this.toastr.error('Failed to display employees', 'Display Employees');
      },
    });
  }

  SubmitAddNewEmployee(): void {
    if (this.addNewEmployee.invalid) return;

    const empData = this.addNewEmployee.value;

    if (this.editingId === null) {
      // Create
      this.empService.add(empData).subscribe({
        next: () => {
          this.getEmployees();
          this.resetForm();
          this.toastr.success(
            'A new employee has been added successfully.',
            'Add New Employee'
          );
        },
        error: (err) => {
          console.error('Failed to add employee:', err);
          this.toastr.error('Failed to add employee', 'Add New Employee');
        },
      });
    } else {
      // Update
      this.empService.update(this.editingId, empData).subscribe({
        next: () => {
          this.getEmployees();
          this.resetForm();
          this.toastr.success(
            'update employee successfully',
            'Update Employee'
          );
        },
        error: (err) => {
          console.error('Failed to update employee:', err);
          this.toastr.error('Failed to update employee', 'Update Employee');
        },
      });
    }
  }

  editEmployee(emp: Employee): void {
    this.addNewEmployee.patchValue(emp);
    this.editingId = emp.id ?? null;
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.empService.delete(id).subscribe({
      next: () => {
        this.getEmployees();
        this.toastr.success(
          'A employee has been delete successfully.',
          'Delete Employee'
        );
      },
      error: (err) => {
        console.error('Failed to delete employee:', err);
        this.toastr.error('Failed to delete employee', 'Delete Employee');
      },
    });
  }

  resetForm(): void {
    this.addNewEmployee.reset();
    this.editingId = null;
  }
}
