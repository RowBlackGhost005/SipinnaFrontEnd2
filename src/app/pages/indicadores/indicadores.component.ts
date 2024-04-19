import { Component, OnInit, inject, signal } from '@angular/core';
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

  tableJson = signal("")

  ngOnInit(): void {
    this._indicadorService.getIndicadores().subscribe((data: IIndicador[]) => {
      this.tableData = data;
      let pendientes = data.length

      //Debido a que en la base de datos, la entidad de indicador guarda nomas el número de referencia al dominio
      //a través de estas iteraciones se cambian los números por los propios nombres de los dominios para que esto 
      //sea lo que vea el usuario en las tablas
      data.forEach(element => {
        this._dominioService.getDominio(element.dominio).subscribe((dominio: IDominio) => {
          element.dominio = dominio.nombre;

          //Al terminar de cambiar todos los campos de "dominio" para tener guardados los nombres,
          //pasa el objeto cambiado al signal de tableJson, para que al exportar el Excel, en la 
          //columna de dominios le aparezca al usuario el nombre del dominio en lugar del número 
          pendientes--;
          if (pendientes === 0) {
            this.tableJson.set(JSON.stringify(data))
            console.log(this.tableJson())
          }
        })
      })


    });
  }

}
