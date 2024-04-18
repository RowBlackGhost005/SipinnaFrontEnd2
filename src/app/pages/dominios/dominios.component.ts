import { Component, OnInit, inject } from '@angular/core';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { DominioService } from '../../services/dominio.service';
import { IDominio } from '../../models/dominio.model';

@Component({
  selector: 'app-dominios',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent],
  templateUrl: './dominios.component.html',
  styleUrl: './dominios.component.scss'
})
export class DominiosComponent implements OnInit{
  private _dominioService = inject(DominioService);
  
  tableData: IDominio[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'iddominio' },
    { header: 'Dominio', field: 'nombre' }
  ];

  ngOnInit(): void {
    this._dominioService.getDominios().subscribe((data: IDominio[]) => {
      console.log(data);
      this.tableData = data;
    })
  }

  //esta variable es el contenido de la tabla mostrada en pantalla convertida a JSON
  //para mandarselo al componente de exportar tabla
  tableJson = JSON.stringify(this.tableData)
}
