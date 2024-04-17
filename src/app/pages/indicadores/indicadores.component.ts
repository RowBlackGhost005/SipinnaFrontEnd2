import { Component } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';

@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [TableComponent, ExportTableComponent],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.scss'
})
export class IndicadoresComponent {
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'id' },
    { header: 'Indicador', field: 'indicador' },
    { header: 'Dominio', field: 'dominio' }
  ];
  
  tableData = [
    { id: 1, indicador: 'Problación', dominio: 'Contexto Demográfico' },
    { id: 2, indicador: 'Mortalidad',  dominio: 'Supervivencia' },
    { id: 3, indicador: 'Vivienda',  dominio: 'Desarrollo' },
    { id: 4, indicador: 'Trabajo',  dominio: 'Protección' },
  ];

  //esta variable es el contenido de la tabla mostrada en pantalla convertida a JSON
  //para mandarselo al componente de exportar tabla
  tableJson = JSON.stringify(this.tableData)
}
