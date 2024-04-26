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
import { Router } from '@angular/router';


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
  private router = inject(Router);

mostrarEliminar:boolean=false;

  tableData: IIndicador[] = [];
  dataAux: IIndicador[] = [];
  filteredTable: IIndicador[] = [];

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idindicador' },
    { header: 'Indicador', field: 'nombre' },
    { header: 'Dominio', field: 'dominio' }
  ];



  agregarFunc() {
    this.router.navigateByUrl('/datos');
  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }
  tableJson = signal("")

  ngOnInit(): void {
    this._indicadorService.getIndicadores().subscribe((data: IIndicador[]) => {
      this.tableData = data;
      let pendientes = data.length
      //esta tablaAux es para hacer el filtro de los campos que no seran necesarios exportar en el excel (metadato y dominioNav)
      let tableAux: any = []

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
            tableAux = data.map(({ metadato, dominioNav, ...resto }) => {
              // La desestructuración extrae "metadato" y "dominioNav" del objeto, y "resto" contiene el resto de las claves
              return resto;
            });

            //Para el json que sera exportado a excel, le mandamos el tableAux que va a omitir los valores de metadato y dominioNav.
            //La razon de esto, es porque metadato solo guarda una referencia dentro del sistema de archivos y dominioNav es una referencia usada en la base de datos
            this.tableJson.set(JSON.stringify(tableAux))

            console.log("el json")
            console.log(tableAux)
            console.log(this.tableJson())
            this.dataAux = data
          }
        })
      })

      //Se queda escuchando para ver si se emite el evento de búsqueda
      this._searchbarService.eventObservable$.subscribe((event) => {
        this.filtrar(event, tableAux)
      })

    });


  }

  /**
  * Función para filtrar los datos que se van a mostrar dentro de la tabla, utiliza filteredTable
  * para guardar la lista de todos los objetos cuyos nombres coincidan con el texto ingresado;
  * dataAux se usa para que no se pierda la lista que contiene todos los objetos a la hora de reemplazar
  * los valores de tableData.
  * 
  * @param text el texto que fue ingresado dentro del buscador
  * @param tableAux Es la tabla que tiene guardado solo el ID, el nombre del indicador y el nombre del dominio para  omitir los otros 2 valores del objeto (metadato y dominioNav)
  */
  filtrar(text: string, tableAux: any[]) {
    const normalizedText = this.normalizeText(text);

    this.filteredTable = tableAux.filter(item => {
      const normalizedField = this.normalizeText(item.nombre)
      return normalizedField.includes(normalizedText)
    });
    this.tableData = this.filteredTable
    //para que se exporte el excel de solo lo que ve el usuario
    this.tableJson.set(JSON.stringify(this.tableData))
  }

  normalizeText(text: string): string {
    // Para normalizar el texto quitando acentos y convirtiendo a minúsculas
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

}
