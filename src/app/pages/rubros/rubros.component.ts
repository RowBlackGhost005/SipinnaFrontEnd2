import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { SidebarIndicatorComponent } from '../../modules/sidebar-components/sidebar-indicator/sidebar-indicator.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { RubroService } from '../../services/rubro.service';
import { IRubro } from '../../models/rubro.model';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { TopMenuComponent } from "../../modules/top-menu-components/top-menu/top-menu.component";
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../modules/dialog/dialog.component';

@Component({
    selector: 'app-rubros',
    standalone: true,
    templateUrl: './rubros.component.html',
    styleUrl: './rubros.component.scss',
    imports: [SidebarIndicatorComponent, ButtonsComponent, TableComponent, ExportTableComponent, ModalComponent, TopMenuComponent, DialogComponent]
})
export class RubrosComponent {

  @ViewChild(ModalComponent) modal?: ModalComponent;
  private _rubroService = inject(RubroService);
  private _route = inject(ActivatedRoute);
  
  tableJson = signal("")
  tableData: IRubro[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idrubro' },
    { header: 'Rubro', field: 'rubro' },
    { header: 'Archivo', field: 'datos' }
  ];

  mensajeAlerta: string = '';
  mostrar: boolean = false;
  idIndicador: number = 0;
  rubroSeleccionado: IRubro = {
    idrubro: 0,
    rubro: '',
    datos: ''
  };

  ngOnInit(): void {
   this.idIndicador = this._route.snapshot.params['id'];
    this.cargarDatos(this.idIndicador);
  }

  cargarDatos(id: number): void {
    this._rubroService.getRubrosDeIndicador(id).subscribe((data: any[]) => {
      this.tableData = data;
      this.tableJson.set(JSON.stringify(this.tableData))
    })
  }

  agregarFunc() {
    this.openModalRubro('Agregar Rubro', 
      'Excel (XLS|XLSX)','Solo se permiten archivos de extension .xlsc .xls', true, 
      'Rubro',true,
      'rubro');

  }

  editarFunc(){}

  eliminarFunc() { 
    if (this.rubroSeleccionado && typeof this.rubroSeleccionado.idrubro !== 'undefined') {
      this._rubroService.deleteRubro(this.rubroSeleccionado.idrubro).subscribe(response => {
        this.cargarDatos(this.idIndicador);
        this.mensajeAlerta = 'El rubro se eliminó correctamente.'
        this.mostrar = true;
      });
    } else {
      console.error('No se puede eliminar el rubro seleccionado porque idenlaces es null o undefined');
    }
  }

  recibeRubro(rubro: IRubro) {
    this.rubroSeleccionado = rubro;
  }

  // Funcion para el boton de agregar, se abre el modal.
  openModalRubro(title: string, 
    lblFile: string, advertenciaFormato:string, showFileInput: boolean,
    lblRubro:string,showDropdownInput:boolean, 
    accion: string) {
    this.modal?.openModalRubro(title,
      lblFile, advertenciaFormato,showFileInput, 
      lblRubro,showDropdownInput, 
      accion);

    // Escuchar el evento de dominio guardado y actualizar la tabla
    this.modal?.nuevoGuardado.subscribe(() => {
      this.mensajeAlerta = 'Se agregó el rubro correctamente.'
      this.cargarDatos(this.idIndicador);
      this.mostrar = true;
    });
  }
}