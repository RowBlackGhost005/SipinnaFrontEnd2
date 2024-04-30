import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { SidebarIndicatorComponent } from '../../modules/sidebar-indicator/sidebar-indicator.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { RubroService } from '../../services/rubro.service';
import { IRubro } from '../../models/rubro.model';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';

@Component({
  selector: 'app-rubros',
  standalone: true,
  imports: [SidebarIndicatorComponent, ButtonsComponent, TableComponent, ExportTableComponent,ModalComponent],
  templateUrl: './rubros.component.html',
  styleUrl: './rubros.component.scss'
})
export class RubrosComponent {

  @ViewChild(ModalComponent) modal?: ModalComponent;
  private _rubroService = inject(RubroService);

  tableJson = signal("")
  tableData: IRubro[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idrubro' },
    { header: 'Rubro', field: 'rubro' },
    { header: 'Archivo', field: 'datos' }
  ];

  ngOnInit(): void {
   this.cargarDatos();
  }

  cargarDatos():void{
    this._rubroService.getRubros().subscribe((data: IRubro[]) => {
      this.tableData = data;
      this.tableJson.set(JSON.stringify(this.tableData))
    })
  }

  agregarFunc() {
    this.openModal('Agregar Rubro', 
      '', '',false,
      false,
      '', '', false,
      'Excel (XLS|XLSX)','Solo se permiten archivos de extension .xlsc .xls', true, 
      'Rubro',true,
      'rubro');

  }

  editarFunc(){}

  eliminarFunc(){}

  // Funcion para el boton de agregar, se abre el modal.
  openModal(title: string, 
    lblNombre: string, placeholderNombre: string, showNameInput:boolean,
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

}
