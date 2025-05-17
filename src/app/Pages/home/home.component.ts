import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Employee } from '../../Core/interfaces/employee';
import { EmployeesService } from '../../Core/services/employees/employees.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SearchPipe } from '../../Shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  editingId: number | null = null;
  searchText: string = '';
  private localStorageKey = 'employees';

  // Form with validation
  addNewEmployee: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('', [Validators.required]),
    salary: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+$/),
    ]),
  });

  constructor(
    private empService: EmployeesService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Try loading from localStorage first
      const localData = localStorage.getItem(this.localStorageKey);
      if (localData) {
        this.employees = JSON.parse(localData);
      } else {
        this.empService.getAll().subscribe({
          next: (res) => {
            this.employees = res;
            this.saveToLocalStorage();
          },
        });
      }
    } else {
      this.employees = [];
    }
  }

  // save To LocalStorage
  saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.employees));
  }

  SubmitAddNewEmployee(): void {
    if (this.addNewEmployee.invalid) return;

    const empData: Employee = {
      ...this.addNewEmployee.value,
      id: this.editingId ?? this.getNextId(),
    };

    if (this.editingId === null) {
      // Add new
      this.employees.push(empData);
      this.toastr.success('Added successfully!', 'Add Employee');
    } else {
      // Update existing
      const index = this.employees.findIndex(
        (emp) => emp.id === this.editingId
      );
      if (index !== -1) this.employees[index] = empData;
      this.toastr.success('Updated successfully!', 'Update Employee');
    }

    this.saveToLocalStorage();
    this.resetForm();
  }

  editEmployee(emp: Employee): void {
    this.addNewEmployee.patchValue(emp);
    this.editingId = emp.id ?? null;
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
    this.saveToLocalStorage();
    this.toastr.success('Deleted successfully!', 'Delete Employee');
  }

  resetForm(): void {
    this.addNewEmployee.reset();
    this.editingId = null;
  }

  // sweetAlert
  confirmBox(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEmployee(id);
        Swal.fire('Deleted!', 'Employee has been removed.', 'success');
      } else {
        Swal.fire('Cancelled', 'Your employee is safe :)', 'error');
      }
    });
  }

  // Get next available ID
  private getNextId(): number {
    if (this.employees.length === 0) return 1;
    return Math.max(...this.employees.map((emp) => emp.id ?? 0)) + 1;
  }
}
