import { Component, Input, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-indicator',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-indicator.component.html',
  styleUrl: './sidebar-indicator.component.scss'
})
export class SidebarIndicatorComponent {
  private router = inject(Router);
  @Input() idIndicador: string = '';
  
  /**
   * Esta función actualiza el Id del indicador 
   * @param nuevoId Id del indicador
   */
  actualizarIdIndicador(nuevoId: string) {
    this.idIndicador = nuevoId;
  }

  /**
   * Esta función muestra activa una ruta en el sidebar
   * @param baseRoute Ruta a mostrar activa
   * @returns Ruta activa
   */
  isActiveRoute(baseRoute: string): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith(baseRoute);
  }
}