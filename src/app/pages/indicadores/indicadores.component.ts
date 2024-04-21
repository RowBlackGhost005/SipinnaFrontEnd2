import { Component, OnInit, inject, signal, ViewChild } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { IndicadorService } from '../../services/indicador.service';
import { DominioService } from '../../services/dominio.service';
import { IIndicador } from '../../models/indicador.model';
import { IDominio } from '../../models/dominio.model';
import { SearchbarService } from '../../services/searchbar.service';


@Component({
  selector: 'app-indicadores',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.scss'
})

export class IndicadoresComponent implements OnInit {
  private _indicadorService = inject(IndicadorService);
  private _dominioService = inject(DominioService);
  private _searchbarService = inject(SearchbarService);


  tableData: IIndicador[] = [];
  dataAux: IIndicador[] = [];
  filteredTable: IIndicador[] = [];

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idindicador' },
    { header: 'Indicador', field: 'nombre' },
    { header: 'Dominio', field: 'dominio' }
  ];



  agregarFunc() {

  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }

  eliminarFunc() {
    // Lógica para la funcionalidad de eliminar
  }

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
            this.dataAux = data
          }
        })
      })

    });

    //Se queda escuchando para ver si se emite el evento de búsqueda
    this._searchbarService.eventObservable$.subscribe((event) => {
      this.filtrar(event)
    })
  }

/**
* Función para filtrar los datos que se van a mostrar dentro de la tabla, utiliza filteredTable
* para guardar la lista de todos los objetos cuyos nombres coincidan con el texto ingresado;
* dataAux se usa para que no se pierda la lista que contiene todos los objetos a la hora de reemplazar
* los valores de tableData.
* 
* @param text el texto que fue ingresado dentro del buscador
*/
  filtrar(text: string) {
    const lowercaseText = text.toLowerCase();
    this.filteredTable = this.dataAux.filter(data => data.nombre.toLowerCase().includes(lowercaseText));
    this.tableData = this.filteredTable
  }

}
