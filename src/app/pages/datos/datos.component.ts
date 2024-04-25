import { Component, inject } from '@angular/core';
import { SidebarIndicatorComponent } from '../../modules/sidebar-indicator/sidebar-indicator.component';
import { FormIndicatorComponent } from '../../modules/form-indicator/form-indicator.component';
import { IndicadorService } from '../../services/indicador.service';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [SidebarIndicatorComponent, FormIndicatorComponent],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss'
})
export class DatosComponent {
  private _indicadorService = inject(IndicadorService);
  indicadorNuevo: FormData = new FormData();
  
  handleEvent(formData: FormData) {
    this._indicadorService.postIndicador(formData).subscribe(response => {
      console.log('Indicador guardado correctamente: ', response);
    },error => {
      console.error('Error al guardar el Indicador: ', error);
    });
  }  
}
