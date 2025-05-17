import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../Core/interfaces/employee';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(employees: Employee[], searchText: string): Employee[] {
    if (!employees || !searchText) {
      return employees;
    }

    const lowerSearch = searchText.toLowerCase();

    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(lowerSearch) ||
        emp.email.toLowerCase().includes(lowerSearch)
    );
  }
}
