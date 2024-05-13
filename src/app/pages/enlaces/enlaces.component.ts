import { Component, inject, signal, ViewChild } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { EnlaceService } from '../../services/enlace.service';
import { IEnlace } from '../../models/enlace.model';
import { SearchbarService } from '../../services/searchbar.service';
import { DialogComponent } from '../../modules/dialog/dialog.component';
import { TopMenuComponent } from "../../modules/top-menu-components/top-menu/top-menu.component";

@Component({
    selector: 'app-enlaces',
    standalone: true,
    templateUrl: './enlaces.component.html',
    styleUrl: './enlaces.component.scss',
    imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent, DialogComponent, TopMenuComponent]
})
export class EnlacesComponent {
  
  @ViewChild(ModalComponent) modal?: ModalComponent;
  private _enlaceService = inject(EnlaceService);
  private _searchbarService = inject(SearchbarService);
  tableData: IEnlace[] = [];
  dataAux: IEnlace[] = [];
  filteredTable: IEnlace[] = [];

  mensajeAlerta: string = '';
  mostrar: boolean = false;

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idenlaces' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  enlaceSeleccionado: IEnlace = {
    titulo: '',
    enlace: '',
    idenlaces: 0
  };

  //los tableJson son señales que guardan el JSON de la tabla que esta viendo los datos.
  //No necesariamente guarda todos los datos, si se hace una busqueda, el tableJson guarda solo los 
  //datos de la búsqueda
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
    this.openModalEnlace('Agregar Enlace', 
    'Titulo del enlace', 'CAPTURE EL TITULO DEL ENLACE', true,
      'Url', 'CAPTURE LA URL DEL ENLACE', true,
      'guardarEnlace');

  }


  constructor(private enlaceService: EnlaceService) {}

  editarFunc() {
      if (this.enlaceSeleccionado && this.enlaceSeleccionado.idenlaces !== 0 && this.enlaceSeleccionado.titulo !== '' && this.enlaceSeleccionado.enlace !== '') {
        this.modal?.editarEnlace(); // Llama al método editarEnlace del modal component
      } else {
        this.mensajeAlerta = 'Seleccione un enlace a editar.';
        this.mostrar = true;
        setTimeout(() => {
          this.mostrar = false;
        }, 3000); 
    }
  }
 

  eliminarFunc() {
    if (this.enlaceSeleccionado && typeof this.enlaceSeleccionado.idenlaces !== 'undefined') {
      this._enlaceService.deleteEnlace(this.enlaceSeleccionado.idenlaces).subscribe(response => {
        this.cargarDatos();
        this.mensajeAlerta = 'El enlace se eliminó correctamente.'
        this.mostrar = true;
        setTimeout(() => {
          this.mostrar = false;
        }, 3000); 
      });
    } else {
      console.error('No se puede eliminar el enlace seleccionado porque idenlaces es null o undefined');
    }
  }

  recibeIndicador(indicador: IEnlace) {
    this.enlaceSeleccionado = indicador;
    this.enlaceService.actualizarEnlaceSeleccionado(indicador);
  }

  // Funcion para el boton de agregar, se abre el modal.
  openModalEnlace(title: string, 
    lblNombre: string, placeholderNombre: string, showNameInput: boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    accion: string) {
    this.modal?.openModalEnlace(title, lblNombre, placeholderNombre, showNameInput,
      lblUrl, placeholderUrl, showUrlInput,
      accion);

    // Escuchar el evento de dominio guardado y actualizar la tabla
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
