import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { SidebarIndicatorComponent } from '../../modules/sidebar-components/sidebar-indicator/sidebar-indicator.component';
import { FormIndicatorComponent } from '../../modules/form-indicator/form-indicator.component';
import { IndicadorService } from '../../services/indicador.service';
import { DialogComponent } from '../../modules/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TopMenuComponent } from "../../modules/top-menu-components/top-menu/top-menu.component";

@Component({
    selector: 'app-datos',
    standalone: true,
    templateUrl: './datos.component.html',
    styleUrl: './datos.component.scss',
    imports: [SidebarIndicatorComponent, FormIndicatorComponent, DialogComponent, TopMenuComponent]
})
export class DatosComponent implements OnInit {
  @ViewChild(DialogComponent) dialog?: DialogComponent;
  @ViewChild(FormIndicatorComponent) formIndicatorComponent!: FormIndicatorComponent;
  private _indicadorService = inject(IndicadorService);
  private _route = inject(ActivatedRoute);
  private router = inject(Router);
  opcionSeleccionada: string = '';
  indicadorNuevo: FormData = new FormData();
  mensajeAlerta: string = '';
  mostrar: boolean = false;
  indicadorId = 0;

  /**
   * Esta función cuando se inicializa el componente, obtiene el id del indicador de la ruta,
   * si este es nulo la opción es agregar y si contiene el id es editar.
   */
  ngOnInit(): void {
    if (this._route.snapshot.params['id'] != undefined) {
      this.indicadorId = this._route.snapshot.params['id'];
      this.opcionSeleccionada = 'editar';
    } else {
      this.opcionSeleccionada = 'agregar';
    }
  }

  /**
   * Maneja el evento para recibir el formulario y ejecutar la opción correspondiente
   * @param formData FormData recibido del formulario
   */
  handleEvent(formData: FormData) {
    if(this.opcionSeleccionada == 'agregar'){
      this.agregar(formData);
    } else if(this.opcionSeleccionada == 'editar'){
      this.editar(formData);
    }
  }

  /**
   * Agrega el elemento a la dao de indicador
   * @param formData FormFata a agregar
   */
  agregar(formData: FormData) {
    this._indicadorService.postIndicador(formData).subscribe(response => {
      this.mensajeAlerta = 'El indicador se guardó correctamente.'
      this.mostrar = true;
      this.indicadorId = response.idindicador;
    }, error => {
      this.mensajeAlerta = 'No se pudo guardar el indicador correctamente.'
    });
  }

  /**
   * Actualiza el elemento en la dao de indicador
   * @param formData FormData a actualizar
   */
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

  /**
   * Esta función obtiene los datos de un indicador a partir de su id y muestra esos datos
   * en el formulario
   * @param indicadorId Id del indicador a buscar
   */
  obtenerIndicador(indicadorId: number) {
    this._indicadorService.getIndicador(indicadorId).subscribe((indicador: any) => {
      this.formIndicatorComponent.setIndicadorValues(indicador);
    });
  }

  /**
   * Esta función navega a la url de los rubros del indicador cuando se cierra
   * el dialog que muestra el mensaje
   */
  onDialogClose(): void {
    this.router.navigateByUrl(`/rubros/${this.indicadorId}`);
  }
}
