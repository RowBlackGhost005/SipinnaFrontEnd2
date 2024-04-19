import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { SidebarItemComponent } from './modules/sidebar-item/sidebar-item.component';
import { TopMenuComponent } from './modules/top-menu/top-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, SidebarItemComponent, TopMenuComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sipinna-frontend';
  titleTop = signal("Inicio")

  //Función para cambiar el título del header de la aplicación dependiendo de la sección en la que se encuentre el usuario
  //Los numeros del switch hacen referencia al orden en el que estan los botones del menú.
  //En el sidebar component, en los eventos click hay una función llamada OptionHandler(), esa funcion recibe un número como parámetro,
  //dicho número es el que vale el parámetro de event en este caso
  changeTitleTop(event:number){
    switch(event){
    case 1:
      this.titleTop.set("Inicio");
      break;
    case 2:
      this.titleTop.set("Dominios");
      break;
    case 3:
      this.titleTop.set("Indicadores");
      break;
    case 4:
      this.titleTop.set("Noticias");
      break;
    case 5:
      this.titleTop.set("Enlaces");
      break;
    case 6:
      this.titleTop.set("Usuarios");
      break;
    default:
      break;
    }
  }

}
