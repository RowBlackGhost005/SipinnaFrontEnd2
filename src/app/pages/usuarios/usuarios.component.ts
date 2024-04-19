import { Component, inject, signal } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { IUsuarios } from '../../models/usuario.model';
import { TableModel } from '../../models/table';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TableComponent,ButtonsComponent,ExportTableComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  private _enlaceService = inject(UsuarioService); 
  
  tableData: IUsuarios[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idenlaces' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

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
}
