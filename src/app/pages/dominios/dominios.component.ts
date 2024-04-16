import { Component } from '@angular/core';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';

@Component({
  selector: 'app-dominios',
  standalone: true,
  imports: [ExportTableComponent, TableComponent],
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
