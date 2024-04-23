
import { Component, OnInit, inject, signal, ViewChild, SimpleChanges } from '@angular/core';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { DominioService } from '../../services/dominio.service';
import { IDominio } from '../../models/dominio.model';
import { SearchbarService } from '../../services/searchbar.service';

@Component({
  selector: 'app-dominios',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent],
  templateUrl: './dominios.component.html',
  styleUrl: './dominios.component.scss'
})

export class DominiosComponent implements OnInit {
  private _dominioService = inject(DominioService);
  private _searchbarService = inject(SearchbarService)
  @ViewChild(ModalComponent) modal?: ModalComponent;
  tableData: IDominio[] = [];
  dataAux:  IDominio[] = [];
  filteredTable: IDominio[] = [];
  filteredItems: IDominio[] = [];

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'iddominio' },
    { header: 'Dominio', field: 'nombre' }
  ];

  tableJson = signal("")

  ngOnInit(): void {
    this._dominioService.getDominios().subscribe((data: IDominio[]) => {
      console.log(data);
      this.tableData = data;
      this.dataAux = data;
      this.tableJson.set(JSON.stringify(this.tableData))
      console.log(this.tableJson())
      console.log(this.tableData)
    }
    )

    //Se queda escuchando para ver si se emite el evento de búsqueda
    this._searchbarService.eventObservable$.subscribe((event)=>{
      this.filtrar(event)
    })
    
  }

  agregarFunc() {
    this.openModal('Agregar Dominio', 'Dominio', 'CAPTURE EL NOMBRE DEL DOMINIO',
      '', '', false,
      '', false);

  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }

  eliminarFunc() {
    // Lógica para la funcionalidad de eliminar
  }
  openModal(title: string, lblNombre: string, placeholderNombre: string,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblImagen: string, showImagenInput: boolean) {
    this.modal?.openModal(title, lblNombre, placeholderNombre,
      lblUrl, placeholderUrl, showUrlInput,
      lblImagen, showImagenInput);
  }



  
  /**
   * Función para filtrar los datos que se van a mostrar dentro de la tabla, utiliza filteredTable
   * para guardar la lista de todos los objetos cuyos nombres coincidan con el texto ingresado;
   * dataAux se usa para que no se pierda la lista que contiene todos los objetos a la hora de reemplazar
   * los valores de tableData.
   * 
   * @param text el texto que fue ingresado dentro del buscador
   */
  filtrar(text: string){
    const normalizedText = this.normalizeText(text);
    this.filteredTable = this.dataAux.filter(item => {
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