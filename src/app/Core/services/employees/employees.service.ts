import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../interfaces/employee';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})

export class EmployeesService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(environment.BASE_URL);
  }

  add(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(environment.BASE_URL, employee);
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${environment.BASE_URL}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.BASE_URL}/${id}`);
  }
}
