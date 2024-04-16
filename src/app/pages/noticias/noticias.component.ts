import { Component } from '@angular/core';
import { TableModel } from '../../models/table';
import { TableComponent } from '../../modules/table/table.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'id' },
    { header: 'Fotografia', field: 'fotografia' },
    { header: 'Titulo', field: 'titulo' },
    { header: 'Enlace', field: 'enlace' }
  ];

  tableData = [
    { id: 1, fotografia: '', titulo: 'Sitio web Sipinna', enlace: 'https://sipinna.sonora.gob.mx'},
    { id: 2, fotografia: '', titulo: 'Sitio web Gobierno de Sonora', enlace: 'https://sonora.gob.mx'},
    { id: 3, fotografia: '', titulo: 'Sitio web Gobierno de México', enlace: 'https://gob.mx'}
  ];
}
