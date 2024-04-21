
import { Component, inject, signal, ViewChild } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { NoticiaService } from '../../services/noticia.service';
import { INoticia } from '../../models/noticia.model';
import { SearchbarService } from '../../services/searchbar.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;

  private _noticiaService = inject(NoticiaService);
  private _searchbarService = inject(SearchbarService);

  tableData: INoticia[] = [];
  dataAux: INoticia[] = [];
  filteredTable: INoticia[] = [];

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idnoticias' },
    { header: 'Fotografia', field: 'imagen' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];
  tableJson = signal("")


  ngOnInit(): void {
    this._noticiaService.getNoticias().subscribe((data: INoticia[]) => {
      console.log(data);
      this.tableData = data;
      this.dataAux = data;

      this.tableJson.set(JSON.stringify(this.tableData))
      console.log(this.tableJson())
    })

    //Se queda escuchando para ver si se emite el evento de búsqueda
    this._searchbarService.eventObservable$.subscribe((event) => {
      this.filtrar(event)
    })
  }

  agregarFunc() {
    this.openModal('Agregar Dominio', 'Dominio', 'CAPTURE EL NOMBRE DEL DOMINIO',
      'Url', 'CAPTURE LA URL DE LA NOTICIA', true,
      'Fotografia de la noticia', true);

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
  * para guardar la lista de todos los objetos cuyos títulos coincidan con el texto ingresado;
  * dataAux se usa para que no se pierda la lista que contiene todos los objetos a la hora de reemplazar
  * los valores de tableData.
  * 
  * @param text el texto que fue ingresado dentro del buscador
  */
  filtrar(text: string) {
    const lowercaseText = text.toLowerCase();
    if (text == "") {
      this.tableData = this.dataAux
    } else {
      this.filteredTable = this.dataAux.filter(data => data.titulo.toLowerCase().includes(lowercaseText));
      this.tableData = this.filteredTable
    }
  }
}
