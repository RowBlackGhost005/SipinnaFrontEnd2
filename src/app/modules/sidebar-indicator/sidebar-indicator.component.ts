import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-indicator',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-indicator.component.html',
  styleUrl: './sidebar-indicator.component.scss'
})
export class SidebarIndicatorComponent {
  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
