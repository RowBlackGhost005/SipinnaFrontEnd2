import { Component, inject, signal, ViewChild } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { EnlaceService } from '../../services/enlace.service';
import { IEnlace } from '../../models/enlace.model';
import { SearchbarService } from '../../services/searchbar.service';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent],
  templateUrl: './enlaces.component.html',
  styleUrl: './enlaces.component.scss'
})
export class EnlacesComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;
  private _enlaceService = inject(EnlaceService);
  private _searchbarService = inject(SearchbarService);
  tableData: IEnlace[] = [];
  dataAux: IEnlace[] = [];
  filteredTable: IEnlace[] = [];

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idenlaces' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  tableJson = signal("")

  ngOnInit(): void {
    this.cargarDatos();
    //Se queda escuchando para ver si se emite el evento de búsqueda
    this._searchbarService.eventObservable$.subscribe((event) => {
      this.filtrar(event)
    })
  }

  cargarDatos(): void {
    this._enlaceService.getEnlaces().subscribe((data: IEnlace[]) => {
      console.log(data);
      this.tableData = data;
      this.dataAux = data;
      this.tableJson.set(JSON.stringify(this.tableData));
      console.log(this.tableJson());
      console.log(this.tableData);
    });
  }
  agregarFunc() {
    this.openModal('Agregar Enlace', 'Titulo del enlace', 'CAPTURE EL TITULO DEL ENLACE',
      'Url', 'CAPTURE LA URL DEL ENLACE', true,
      '', false, 'enlace');

  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }



  eliminarFunc() {
 
  }


  // Funcion para el boton de agregar, se abre el modal.
  openModal(title: string, lblNombre: string, placeholderNombre: string,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblImagen: string, showImagenInput: boolean, accion: string) {
    this.modal?.openModal(title, lblNombre, placeholderNombre,
      lblUrl, placeholderUrl, showUrlInput,
      lblImagen, showImagenInput, accion);

    // Escuchar el evento de evento guardado y actualizar la tabla
    this.modal?.nuevoGuardado.subscribe(() => {
      this.cargarDatos();

    });
  }


  /**
 * Función para filtrar los datos que se van a mostrar dentro de la tabla, utiliza filteredTable
 * para guardar la lista de todos los objetos cuyos títulos coincidan con el texto ingresado;
 * dataAux se usa para que no se pierda la lista que contiene todos los objetos a la hora de reemplazar
 * los valores de tableData.
 * 
 * @param text el texto que fue ingresado dentro del buscador
 */
  filtrar(text: string) {
    const normalizedText = this.normalizeText(text);

    this.filteredTable = this.dataAux.filter(item => {
      const normalizedField = this.normalizeText(item.titulo)
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
