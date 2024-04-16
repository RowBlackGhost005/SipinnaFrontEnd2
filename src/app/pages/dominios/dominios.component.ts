import { Component } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';

@Component({
  selector: 'app-dominios',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './dominios.component.html',
  styleUrl: './dominios.component.scss'
})
export class DominiosComponent {
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'id' },
    { header: 'Dominio', field: 'dominio' }
  ];

  tableData = [
    { id: 1, dominio: 'Contexto Demográfico' },
    { id: 2, dominio: 'Supervivencia' },
    { id: 3, dominio: 'Desarrollo' },
    { id: 4, dominio: 'Protección' },
  ];
}
