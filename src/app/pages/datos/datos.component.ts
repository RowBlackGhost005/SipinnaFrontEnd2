import { Component } from '@angular/core';
import { SidebarIndicatorComponent } from '../../modules/sidebar-indicator/sidebar-indicator.component';
import { FormIndicatorComponent } from '../../modules/form-indicator/form-indicator.component';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [SidebarIndicatorComponent, FormIndicatorComponent],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss'
})
export class DatosComponent {

}
