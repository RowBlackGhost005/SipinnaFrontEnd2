import { Component, inject, signal, ViewChild } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { EnlaceService } from '../../services/enlace.service';
import { IEnlace } from '../../models/enlace.model';

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

  tableData: IEnlace[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idenlaces' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  tableJson = signal("")

  ngOnInit(): void {
    this._enlaceService.getEnlaces().subscribe((data: IEnlace[]) => {
      console.log(data);
      this.tableData = data;

      this.tableJson.set(JSON.stringify(this.tableData))
      console.log(this.tableJson())
    })
  }


  agregarFunc() {
    this.openModal('Agregar Enlace', 'Titulo del enlace', 'CAPTURE EL TITULO DEL ENLACE',
      'Url', 'CAPTURE LA URL DEL ENLACE', true,
      '', false,'enlace');

  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }

  eliminarFunc() {
    // Lógica para la funcionalidad de eliminar
  }

   // Funcion para el boton de agregar, se abre el modal.
   openModal(title: string, lblNombre: string, placeholderNombre: string,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblImagen: string, showImagenInput: boolean,accion:string) {
    this.modal?.openModal(title, lblNombre, placeholderNombre,
      lblUrl, placeholderUrl, showUrlInput,
      lblImagen, showImagenInput,accion);
  }
}
