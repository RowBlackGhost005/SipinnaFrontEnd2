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
  //los tableJson son señales que guardan el JSON de la tabla que esta viendo los datos.
  //No necesariamente guarda todos los datos, si se hace una busqueda, el tableJson guarda solo los 
  //datos de la búsqueda
  tableJson = signal("")
  tableData: IRubro[] = [];
  // Campos de la tabla de rubros
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idrubro' },
    { header: 'Rubro', field: 'rubro' },
    { header: 'Archivo', field: 'datos', clickable:true}
  ];

    //Funcion para manipular el Dialog
  mensajeAlerta: string = '';
  mostrar: boolean = false;

  idIndicador: number = 0;
  rubroSeleccionado: IRubro = {
    idrubro: 0,
    rubro: '',
    datos: ''
  };

  /**
   * Esta función se ejecuta cuando se inicializa el componente, obtiene el id
   * del indicador de la ruta y carga los datos de ese indicador
   */
  ngOnInit(): void {
   this.idIndicador = this._route.snapshot.params['id'];
    this.cargarDatos(this.idIndicador);
  }

  /**
   * Esta función obtiene los rubros que pertenecen al indicador seleccionado y los
   * muestra en la tabla
   * @param id Id del indicador
   */
  cargarDatos(id: number): void {
    this._rubroService.getRubrosDeIndicador(id).subscribe((data: any[]) => {
      this.tableData = data;
      this.tableJson.set(JSON.stringify(this.tableData))
      for(let i=0; i<this.tableData.length; i++){
        this.tableData[i].datos = 'Descargar'
      }
    })
  }

  agregarFunc() {
    this.openModalRubro('Agregar Rubro', 
      'Excel (XLS|XLSX)','Solo se permiten archivos de extension .xlsc .xls', true, 
      'Rubro',true,
      'guardarRubro');

  }

  editarFunc(){
    if (this.rubroSeleccionado&& this.rubroSeleccionado.idrubro !== 0 && this.rubroSeleccionado.datos !== '' && this.rubroSeleccionado.rubro !== '') {
      this.modal?.editarRubro(); // Llama al método editarRubro del modal component
    } else {
      this.mensajeAlerta = 'Seleccione un rubro a editar.';
      this.mostrar = true;
      setTimeout(() => {
        this.mostrar = false;
      }, 3000); 
  }
  }


  /**
   * Esta función verifica que se haya seleccionado un rubro y posteriormente 
   * lo elimina de la dao de rubros
   */
  eliminarFunc() { 
    if (this.rubroSeleccionado && typeof this.rubroSeleccionado.idrubro !== 'undefined') {
      this._rubroService.deleteRubro(this.rubroSeleccionado.idrubro).subscribe(response => {
        this.cargarDatos(this.idIndicador);
        this.mensajeAlerta = 'El rubro se eliminó correctamente.'
        this.mostrar = true;
        setTimeout(() => {
          this.mostrar = false;
        }, 3000); 
      });
    } else {
      console.error('No se puede eliminar el rubro seleccionado porque id es null o undefined');
    }
  }

  /**
   * Esta función maneja el evento para recibir el rubro
   * @param rubro Rubro recibido
   */
  recibeRubro(rubro: IRubro) {
    this.rubroSeleccionado = rubro;
    this._rubroService.actualizarRubroSeleccionado(rubro);
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
      console.log(this.tableData)

    // Escuchar el evento de dominio guardado y actualizar la tabla
    this.modal?.nuevoGuardado.subscribe(() => {
      this.mensajeAlerta = 'Se agregó el rubro correctamente.'
      this.cargarDatos(this.idIndicador);
      this.mostrar = true;
    });
  }
  
  descargarArchivo(event: number) {
    this._rubroService.getRubroDescarga(event).subscribe((response: Blob) => {
      // Crear una URL a partir de la respuesta Blob
      const url = window.URL.createObjectURL(response);
  
      const a = document.createElement('a');
      a.href = url;
      
      //Busca en el arreglo un objeto que tenga un id que coincida con el que fue emitido
      //Y usa el nombre del rubro para nombrar al excel
      const rubroObj = this.tableData.find(obj => obj.idrubro === event);

      a.download = `${rubroObj?.rubro}.xlsx`;
      

      // Hacer clic en el elemento de anclaje para iniciar la descarga
      document.body.appendChild(a);
      a.click();
  
      // Limpiar
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}