import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  addNewEmployee: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    image: new FormControl(null, [Validators.required]),
    salary: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  SubmitAddNewEmployee(): void {
    console.log(this.addNewEmployee.value)
  }
}
