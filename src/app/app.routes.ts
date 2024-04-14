import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () =>
			import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
    },
    {
        path:'dominios',
        loadComponent: () =>
			import('./pages/dominios/dominios.component').then((c) => c.DominiosComponent),
    },
    {
        path:'indicadores',
        loadComponent: () =>
			import('./pages/indicadores/indicadores.component').then((c) => c.IndicadoresComponent),
    },
    {
        path:'noticias',
        loadComponent: () =>
			import('./pages/noticias/noticias.component').then((c) => c.NoticiasComponent),
    },
    {
        path:'enlaces',
        loadComponent: () =>
			import('./pages/enlaces/enlaces.component').then((c) => c.EnlacesComponent),
    },

];
