
import { Component, OnInit, inject, signal, ViewChild } from '@angular/core';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { DominioService } from '../../services/dominio.service';
import { IDominio } from '../../models/dominio.model';

@Component({
  selector: 'app-dominios',
  standalone: true,
  imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent],
  templateUrl: './dominios.component.html',
  styleUrl: './dominios.component.scss'
})

export class DominiosComponent implements OnInit{
  private _dominioService = inject(DominioService);
  @ViewChild(ModalComponent) modal?: ModalComponent;
  tableData: IDominio[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'iddominio' },
    { header: 'Dominio', field: 'nombre' }
  ];

  tableJson = signal("")

  ngOnInit(): void {
    this._dominioService.getDominios().subscribe((data: IDominio[]) => {
      console.log(data);
      this.tableData = data;
      this.tableJson.set(JSON.stringify(this.tableData))
      console.log(this.tableJson())
    }
  )
  }

  agregarFunc() {
    this.openModal('Agregar Dominio', 'Dominio','CAPTURE EL NOMBRE DEL DOMINIO');

  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }

  eliminarFunc() {
    // Lógica para la funcionalidad de eliminar
  }
  openModal(title: string, label: string,placeholder:string) {
    this.modal?.openModal(title, label,placeholder);
  }
}