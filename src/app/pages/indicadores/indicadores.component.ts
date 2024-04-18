import { Component, OnInit, inject } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { IndicadorService } from '../../services/indicador.service';
import { DominioService } from '../../services/dominio.service';
import { IIndicador } from '../../models/indicador.model';
import { IDominio } from '../../models/dominio.model';


@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.scss'
})
export class IndicadoresComponent implements OnInit{
  private _indicadorService = inject(IndicadorService);
  private _dominioService = inject(DominioService);

  tableData: IIndicador[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idindicador' },
    { header: 'Indicador', field: 'nombre' },
    { header: 'Dominio', field: 'dominio' }
  ];

  ngOnInit(): void {
    this._indicadorService.getIndicadores().subscribe((data: IIndicador[]) => {
      this.tableData = data;
      
      data.forEach(element => {
        this._dominioService.getDominio(element.dominio).subscribe((dominio: IDominio) => {
          element.dominio = dominio.nombre;
        })
      })
    });
  }

  //esta variable es el contenido de la tabla mostrada en pantalla convertida a JSON
  //para mandarselo al componente de exportar tabla
  tableJson = JSON.stringify(this.tableData)
}
