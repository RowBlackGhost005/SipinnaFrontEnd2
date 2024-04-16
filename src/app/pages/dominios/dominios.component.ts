import { Component } from '@angular/core';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';

@Component({
  selector: 'app-dominios',
  standalone: true,
  imports: [ExportTableComponent],
  templateUrl: './dominios.component.html',
  styleUrl: './dominios.component.scss'
})
export class DominiosComponent {

}
