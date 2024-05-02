
import { Component, inject, signal, ViewChild } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { NoticiaService } from '../../services/noticia.service';
import { INoticia } from '../../models/noticia.model';
import { SearchbarService } from '../../services/searchbar.service';
import { TopMenuComponent } from "../../modules/top-menu/top-menu.component";
import { DialogComponent } from '../../modules/dialog/dialog.component';

@Component({
    selector: 'app-noticias',
    standalone: true,
    templateUrl: './noticias.component.html',
    styleUrl: './noticias.component.scss',
    imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent, TopMenuComponent, DialogComponent]
})
export class NoticiasComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;

  private _noticiaService = inject(NoticiaService);
  private _searchbarService = inject(SearchbarService);
  mensajeAlerta: string = '';
  mostrar: boolean = false;
  tableData: INoticia[] = [];
  dataAux: INoticia[] = [];
  filteredTable: INoticia[] = [];

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idnoticias' },
    { header: 'Fotografia', field: 'imagen' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  noticiaSeleccionada: INoticia = {
    titulo: '',
    imagen: '',
    enlace: ''
  };
  tableJson = signal("")


  ngOnInit(): void {
   this.cargarDatos();

    //Se queda escuchando para ver si se emite el evento de búsqueda
    this._searchbarService.eventObservable$.subscribe((event) => {
      this.filtrar(event)
    })
  }

  cargarDatos(){
    this._noticiaService.getNoticias().subscribe((data: INoticia[]) => {
      console.log(data);
      this.tableData = data;
      this.dataAux = data;

      this.tableJson.set(JSON.stringify(this.tableData))
      console.log(this.tableJson())
    })
  }

  agregarFunc() {
    this.openModal('Agregar Noticia', 'Titulo', 'CAPTURE EL TITULO DE LA NOTICIA', true,
    false,
    'Url', 'CAPTURE LA URL DE LA NOTICIA', true,
    'Fotografia de la noticia','Solo se permiten archivos de extension .png .jpg .jpeg y maximo de 2mb',true,
    '',false,
    'noticia');

  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }

  eliminarFunc() {
    if (this.noticiaSeleccionada && typeof this.noticiaSeleccionada.idnoticias !== 'undefined') {
      this._noticiaService.deleteNoticia(this.noticiaSeleccionada.idnoticias).subscribe(response => {
        this.cargarDatos();
        this.mensajeAlerta = 'La noticia se eliminó correctamente.'
        this.mostrar = true;
      });
    } else {
      console.error('No se puede eliminar la noticia seleccionada porque id es null o undefined');
    }
  }

  recibeNoticia(noticia: INoticia) {
    this.noticiaSeleccionada = noticia;
  }

  openModal(title: string, lblNombre: string, placeholderNombre: string, showNameInput:boolean,
    showSwitchInput:boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblFile: string, advertenciaFormato:string, showFileInput: boolean,
    lblRubro:string,showDropdownInput:boolean, 
    accion: string) {
    this.modal?.openModal(title, lblNombre, placeholderNombre, showNameInput,
      showSwitchInput,
      lblUrl, placeholderUrl, showUrlInput,
      lblFile, advertenciaFormato,showFileInput, 
      lblRubro,showDropdownInput, 
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

