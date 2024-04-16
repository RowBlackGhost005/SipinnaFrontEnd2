import { Component, Input } from '@angular/core';
import { TableModel } from '../../models/table';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  selectedItemIndex: number = -1;

  @Input() columns: TableModel[] = [];
  @Input() data: any[] = [];

  selectItem(index: number){
    this.selectedItemIndex = index;
    console.log(this.selectedItemIndex);
  }

  isText(value: any): boolean {
    return typeof value === 'string';
  }
}
