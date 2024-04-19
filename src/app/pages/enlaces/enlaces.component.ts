import { Component, ViewChild } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [TableComponent,ButtonsComponent, ExportTableComponent,ModalComponent],
  templateUrl: './enlaces.component.html',
  styleUrl: './enlaces.component.scss'
})
export class EnlacesComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;


  tableColumns: TableModel[] = [
    { header: 'ID', field: 'id' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  tableData = [
    { id: 1, titulo: 'Sitio web Sipinna', enlace: 'https://sipinna.sonora.gob.mx'},
    { id: 2, titulo: 'Sitio web Gobierno de Sonora', enlace: 'https://sonora.gob.mx'},
    { id: 3, titulo: 'Sitio web Gobierno de México', enlace: 'https://gob.mx'}
  ];

  //esta variable es el contenido de la tabla mostrada en pantalla convertida a JSON
  //para mandarselo al componente de exportar tabla
  tableJson = JSON.stringify(this.tableData)

  agregarFunc() {
    this.openModal('Agregar Indicador', 'Agrega un indicador');

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
