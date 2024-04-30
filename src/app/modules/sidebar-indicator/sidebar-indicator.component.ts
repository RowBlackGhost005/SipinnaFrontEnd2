import { Component, inject } from '@angular/core';
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

  isActiveRoute(baseRoute: string): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith(baseRoute);
  }
}