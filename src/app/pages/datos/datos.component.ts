import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { SidebarIndicatorComponent } from '../../modules/sidebar-indicator/sidebar-indicator.component';
import { FormIndicatorComponent } from '../../modules/form-indicator/form-indicator.component';
import { IndicadorService } from '../../services/indicador.service';
import { DialogComponent } from '../../modules/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [SidebarIndicatorComponent, FormIndicatorComponent, DialogComponent],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss'
})
export class DatosComponent implements OnInit {
  @ViewChild(DialogComponent) dialog?: DialogComponent;
  @ViewChild(FormIndicatorComponent) formIndicatorComponent!: FormIndicatorComponent;
  private _indicadorService = inject(IndicadorService);
  private _route = inject(ActivatedRoute);
  opcionSeleccionada: string = '';
  indicadorNuevo: FormData = new FormData();
  mensajeAlerta: string = '';
  mostrar: boolean = false;

  ngOnInit(): void {
    const indicadorId = this._route.snapshot.params['id'];

    if (indicadorId != undefined) {
      this.obtenerIndicador(indicadorId);
      this.opcionSeleccionada = 'editar';
    } else {
      this.opcionSeleccionada = 'agregar';
    }
  }

  handleEvent(formData: FormData) {
    if(this.opcionSeleccionada == 'agregar'){
      this.agregar(formData);
    } else if(this.opcionSeleccionada == 'editar'){
      this.editar(formData);
    }
  }

  agregar(formData: FormData) {
    this._indicadorService.postIndicador(formData).subscribe(response => {
      this.mensajeAlerta = 'El indicador se guardó correctamente.'
      this.mostrar = true;
    }, error => {
      this.mensajeAlerta = 'No se pudo guardar el indicador correctamente.'
    });
  }

  editar(formData: FormData) {
    this._route.params.subscribe(params => {
      this._indicadorService.putIndicador(params['id'], formData).subscribe(response => {
        this.mensajeAlerta = 'El indicador se editó correctamente.'
        this.mostrar = true;
      }, error => {
        this.mensajeAlerta = 'No se pudo editar el indicador correctamente.'
      });
    })
  }

  obtenerIndicador(indicadorId: number) {
    this._indicadorService.getIndicador(indicadorId).subscribe((indicador: any) => {
      this.formIndicatorComponent.setIndicadorValues(indicador);
    });
  }
}
