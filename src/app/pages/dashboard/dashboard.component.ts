import { Component } from '@angular/core';
import { TopMenuComponent } from '../../modules/top-menu-components/top-menu/top-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
