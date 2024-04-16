import { Component } from '@angular/core';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';

@Component({
  selector: 'app-enlaces',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './enlaces.component.html',
  styleUrl: './enlaces.component.scss'
})
export class EnlacesComponent {
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'id' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  tableData = [
    { id: 1, titulo: 'Sitio web Sipinna', enlace: 'https://sipinna.sonora.gob.mx'},
    { id: 2, titulo: 'Sitio web Gobierno de Sonora', enlace: 'https://sonora.gob.mx'},
    { id: 3, titulo: 'Sitio web Gobierno de México', enlace: 'https://gob.mx'}
  ];
}
