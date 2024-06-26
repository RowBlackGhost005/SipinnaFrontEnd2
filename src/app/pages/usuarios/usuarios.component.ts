import { Component, inject, signal } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { IUsuarios } from '../../models/usuario.model';
import { TableModel } from '../../models/table';
import { UsuarioService } from '../../services/usuario.service';
import { TopMenuComponent } from "../../modules/top-menu-components/top-menu/top-menu.component";

@Component({
    selector: 'app-usuarios',
    standalone: true,
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.scss',
    imports: [TableComponent, ButtonsComponent, ExportTableComponent, TopMenuComponent]
})
export class UsuariosComponent {
  private _enlaceService = inject(UsuarioService); 
  
  tableData: IUsuarios[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idenlaces' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  //los tableJson son señales que guardan el JSON de la tabla que esta viendo los datos.
  //No necesariamente guarda todos los datos, si se hace una busqueda, el tableJson guarda solo los 
  //datos de la búsqueda
  tableJson = signal("")
  
  /*
  //Cuando quede el api de usuarios, quitar comentario

  ngOnInit(): void {
      this._enlaceService.getUsuarios().subscribe((data: IUsuarios[]) => {
      console.log(data);
      this.tableData = data;

      this.tableJson.set(JSON.stringify(this.tableData))
      console.log(this.tableJson())
    })
  }
  */

  //BOTONES DE AGREGAR, EDITAR Y ELIMINAR

  agregarFunc() {
        // Lógica para la funcionalidad de guardar
  }

  editarFunc() {
    // Lógica para la funcionalidad de editar
  }

  eliminarFunc() {
    // Lógica para la funcionalidad de eliminar
  }
}
