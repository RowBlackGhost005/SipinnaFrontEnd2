import { Component, OnInit, inject, signal } from '@angular/core';
import { SidebarIndicatorComponent } from '../../modules/sidebar-indicator/sidebar-indicator.component';
import { ButtonsComponent } from '../../modules/buttons/buttons.component';
import { TableComponent } from '../../modules/table/table.component';
import { TableModel } from '../../models/table';
import { RubroService } from '../../services/rubro.service';
import { IRubro } from '../../models/rubro.model';
import { ExportTableComponent } from '../../modules/export-table/export-table.component';

@Component({
  selector: 'app-rubros',
  standalone: true,
  imports: [SidebarIndicatorComponent, ButtonsComponent, TableComponent, ExportTableComponent],
  templateUrl: './rubros.component.html',
  styleUrl: './rubros.component.scss'
})
export class RubrosComponent {
  private _rubroService = inject(RubroService);
  tableJson = signal("")
  tableData: IRubro[] = [];
  tableColumns: TableModel[] = [
    { header: 'ID', field: 'idrubro' },
    { header: 'Rubro', field: 'rubro' },
    { header: 'Archivo', field: 'datos' }
  ];

  ngOnInit(): void {
    this._rubroService.getRubros().subscribe((data: IRubro[]) => {
      this.tableData = data;
      this.tableJson.set(JSON.stringify(this.tableData))
    })
  }
}
