
import { Component, inject, signal, ViewChild } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { NoticiaService } from '../../services/noticia.service';
import { INoticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [TableComponent,ButtonsComponent, ExportTableComponent,ModalComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
  @ViewChild(ModalComponent) modal?: ModalComponent;

  private _noticiaService = inject(NoticiaService);

  tableData: INoticia[] = [];
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

      this.tableJson.set(JSON.stringify(this.tableData))
      console.log(this.tableJson())
    })
  }

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
