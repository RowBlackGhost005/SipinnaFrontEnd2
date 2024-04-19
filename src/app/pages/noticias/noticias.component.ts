import { Component, ViewChild } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [TableComponent,ButtonsComponent, ExportTableComponent,ModalComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;


  tableColumns: TableModel[] = [
    { header: 'ID', field: 'id' },
    { header: 'Fotografia', field: 'fotografia' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  tableData = [
    { id: 1, fotografia: '', titulo: 'Sitio web Sipinna', enlace: 'https://sipinna.sonora.gob.mx'},
    { id: 2, fotografia: '', titulo: 'Sitio web Gobierno de Sonora', enlace: 'https://sonora.gob.mx'},
    { id: 3, fotografia: '', titulo: 'Sitio web Gobierno de México', enlace: 'https://gob.mx'}
  ];

  //esta variable es el contenido de la tabla mostrada en pantalla convertida a JSON
  //para mandarselo al componente de exportar tabla
  tableJson = JSON.stringify(this.tableData)

  agregarFunc() {
    this.openModal('Agregar Noticia', 'Agrega una noticia');

  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }

  eliminarFunc() {
    // Lógica para la funcionalidad de eliminar
  }
  openModal(title: string, message: string) {
    this.modal?.openModal(title, message);
  }
}
