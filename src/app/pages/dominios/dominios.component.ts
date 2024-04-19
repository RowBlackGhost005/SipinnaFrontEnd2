import { Component, ViewChild } from '@angular/core';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ModalComponent } from '../../modules/modal/modal.component';

@Component({
  selector: 'app-dominios',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent],
  templateUrl: './dominios.component.html',
  styleUrl: './dominios.component.scss'
})
export class DominiosComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;


  tableColumns: TableModel[] = [
    { header: 'ID', field: 'id' },
    { header: 'Dominio', field: 'dominio' }
  ];

  tableData = [
    { id: 1, dominio: 'Contexto Demográfico' },
    { id: 2, dominio: 'Supervivencia' },
    { id: 3, dominio: 'Desarrollo' },
    { id: 4, dominio: 'Protección' },
  ];

  //esta variable es el contenido de la tabla mostrada en pantalla convertida a JSON
  //para mandarselo al componente de exportar tabla
  tableJson = JSON.stringify(this.tableData)

  agregarFunc() {
    this.openModal('Agregar Dominios', 'Agrega un dominio');

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