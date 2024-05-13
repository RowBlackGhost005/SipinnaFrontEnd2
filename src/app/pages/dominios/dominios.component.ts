
import { Component, inject, signal, ViewChild } from '@angular/core';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ModalComponent } from '../../modules/modal/modal.component';
import { DominioService } from '../../services/dominio.service';
import { IDominio } from '../../models/dominio.model';
import { SearchbarService } from '../../services/searchbar.service';
import { TopMenuComponent } from '../../modules/top-menu-components/top-menu/top-menu.component';
import { DialogComponent } from "../../modules/dialog/dialog.component";

@Component({
    selector: 'app-dominios',
    standalone: true,
    templateUrl: './dominios.component.html',
    styleUrl: './dominios.component.scss',
    imports: [TableComponent, ButtonsComponent, ExportTableComponent, ModalComponent, TopMenuComponent, DialogComponent]
})

export class DominiosComponent {
  
  
  @ViewChild(ModalComponent) modal?: ModalComponent;
  private _dominioService = inject(DominioService);
  private _searchbarService = inject(SearchbarService)
  tableData: IDominio[] = [];
  dataAux: IDominio[] = [];
  filteredTable: IDominio[] = [];
  filteredItems: IDominio[] = [];


  //Variables para manipular el DialogComponent
  mensajeAlerta: string = '';
  mostrar: boolean = false;

  tableColumns: TableModel[] = [
    { header: 'ID', field: 'iddominio' },
    { header: 'Dominio', field: 'nombre' },
    {header:'Estado',field:'estado'}
  ];

  //Aqui se almacena el dominio que haya sido seleccionado de la tabla
  dominioSeleccionado: IDominio = {
    nombre: '',
    estado: false,
    iddominio: 0
  };

  tableJson = signal("")

  ngOnInit(): void {
    this.cargarDatos();
    //Se queda escuchando para ver si se emite el evento de búsqueda
    this._searchbarService.eventObservable$.subscribe((event) => {
      this.filtrar(event)
    })

  }

 //Se cargan datos a la tabla
  cargarDatos(): void {
    this._dominioService.getDominios().subscribe((data: IDominio[]) => {
      console.log(data);
      this.tableData = data;
      this.dataAux = data;
      this.tableJson.set(JSON.stringify(this.tableData));
      console.log(this.tableJson());
      console.log(this.tableData);
    });
  }

//Abre el modal para agregar un nuevo dominio
  agregarFunc() {
    this.openModalDominio('Agregar Dominio',
     'Dominio', 'CAPTURE EL NOMBRE DEL DOMINIO', true,
    true,
      'guardarDominio');

  }

//Funcion verifica que si haya un dominio seleccionado y despues abre el modal para editarlo
  editarFunc() {
    if (this.dominioSeleccionado && this.dominioSeleccionado.iddominio !== 0 && this.dominioSeleccionado.nombre !== '' && this.dominioSeleccionado.estado !== undefined) {
      this.modal?.editarDominio(); // Llama al método editarDominio del modal component
    } else {
      this.mensajeAlerta = 'Seleccione un dominio a editar.';
      this.mostrar = true;
      setTimeout(() => {
        this.mostrar = false;
      }, 3000); 
  }
  }
  //No estaba dentro de nuestra definicion de proyecto.
  eliminarFunc() {
    // if (this.dominioSeleccionado && typeof this.dominioSeleccionado.iddominio !== 'undefined') {
    //   this._dominioService.deleteDominio(this.dominioSeleccionado.iddominio).subscribe(response => {
    //     this.cargarDatos();
    //     this.mensajeAlerta = 'El dominio se eliminó correctamente.'
    //     this.mostrar = true;
    //     setTimeout(() => {
    //       this.mostrar = false;
    //     }, 3000); 
    //   });
    // } else {
    //   console.error('No se puede eliminar el enlace seleccionado porque idenlaces es null o undefined');
    // }
  }

 //Funcion para recibir los datos del dominio que se seleccione de la tabla
    recibeIndicador(indicador: IDominio) {
      this.dominioSeleccionado = indicador;
      this._dominioService.actualizarDominioSeleccionado(indicador);
  }
  

  // Funcion para el boton de agregar, se abre el modal.
  openModalDominio(title: string, 
    lblNombre: string, placeholderNombre: string, showNameInput:boolean,
    showSwitchInput:boolean,
    accion:string
   ) {
    this.modal?.openModalDominio(title, lblNombre, placeholderNombre, showNameInput,
      showSwitchInput,
    accion);
    // Escuchar el evento de dominio guardado y actualizar la tabla
    this.modal?.nuevoGuardado.subscribe(() => {
      this.cargarDatos();

    });
  }





  /**
   * Función para filtrar los datos que se van a mostrar dentro de la tabla, utiliza filteredTable
   * para guardar la lista de todos los objetos cuyos nombres coincidan con el texto ingresado;
   * dataAux se usa para que no se pierda la lista que contiene todos los objetos a la hora de reemplazar
   * los valores de tableData.
   * 
   * @param text el texto que fue ingresado dentro del buscador
   */
  filtrar(text: string) {
    const normalizedText = this.normalizeText(text);
    this.filteredTable = this.dataAux.filter(item => {
      const normalizedField = this.normalizeText(item.nombre)
      return normalizedField.includes(normalizedText)
    });

    this.tableData = this.filteredTable
    //para que se exporte el excel de solo lo que ve el usuario
    this.tableJson.set(JSON.stringify(this.tableData))
  }

  normalizeText(text: string): string {
    // Para normalizar el texto quitando acentos y convirtiendo a minúsculas
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }


}