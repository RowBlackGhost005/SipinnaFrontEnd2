import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { TableModel } from '../../models/table';
import { UpperCasePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [UpperCasePipe, NgxPaginationModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class TableComponent implements OnChanges{
  selectedItemIndex: number = -1;
  total: number = 0; // Total de elementos de la tabla
  pageSize = 6; // Total de elementos por página
  page = 1; // Página actual

  @Input() columns: TableModel[] = [];
  @Input() data: any[] = [];

  selectItem(index: number){
    this.selectedItemIndex = index;
    console.log(this.selectedItemIndex);
  }

  isText(value: any): boolean {
    return typeof value === 'string';
  }

  // Método para actualizar la variable "total" de la tabla cuando 
  // haya cambios en la lista de "data" y que la paginación se ajuste 
  // cuando cambie la cantidad de elementos de la tabla
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.total = this.data.length;
    }
  }
}
