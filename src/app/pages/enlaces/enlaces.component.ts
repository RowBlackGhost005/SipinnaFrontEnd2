import { Component, inject } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';
import { EnlaceService } from '../../services/enlace.service';
import { IEnlace } from '../../models/enlace.model';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [TableComponent,ButtonsComponent, ExportTableComponent],
  templateUrl: './enlaces.component.html',
  styleUrl: './enlaces.component.scss'
})
export class EnlacesComponent {
  private _enlaceService = inject(EnlaceService); 
  
  tableData: IEnlace[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idenlaces' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];
  
  ngOnInit(): void {
      this._enlaceService.getEnlaces().subscribe((data: IEnlace[]) => {
      console.log(data);
      this.tableData = data;
    })
  }

  //esta variable es el contenido de la tabla mostrada en pantalla convertida a JSON
  //para mandarselo al componente de exportar tabla
  tableJson = JSON.stringify(this.tableData)
}
