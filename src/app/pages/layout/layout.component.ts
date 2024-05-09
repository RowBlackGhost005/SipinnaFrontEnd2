import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarItemComponent } from '../../modules/sidebar-components/sidebar-item/sidebar-item.component';
import { SidebarComponent } from '../../modules/sidebar-components/sidebar/sidebar.component';
import { TopMenuComponent } from '../../modules/top-menu-components/top-menu/top-menu.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, SidebarItemComponent, TopMenuComponent, DashboardComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  title = 'sipinna-frontend';
  titleTop = signal("Inicio")
  //es para mostrar o no la barra de búsqueda

  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;

   @HostListener('window:resize')
   onWindowResize(){
    this.updateSidebarDisplay();
    // this.getSearchbarStatus();
   }

  /**
   * Cuando recargas la página y te encuentras en dominio, indicadores, etc..., el titulo dice que se encuentra en 
   * inicio, con esta funcion guardamos el titulo en el localstorage para que ya no aparezca
   */
  saveTitle(){
    const titleTop:string = this.titleTop()

    const jsonTitle = JSON.stringify(titleTop)

    localStorage.setItem('titleTop', jsonTitle)
  }

  /**
   * Oculta el sidebar principal
   */
  hideSidebar(){      
    this.sidebar.nativeElement.style.display = 'none';
  }


  /**
   * Vuelve a mostrar el sidebar, solo que ahora con posicion absoluta 
   * para que se ponga por encima del todo (solo se usa cuando la dimension horizontal de la página es pequeña)
   */
  showSidebar(){
    this.sidebar.nativeElement.style.display = 'flex';
    this.sidebar.nativeElement.style.position = 'absolute';
    this.sidebar.nativeElement.style.zIndex = '1090';
  }

  /**
   * Cada que se cambia el ancho del sidebar, si la anchura de la página es mayor que 860px
   * vuelve a colocar el sidebar como se encuentra regularmente en la página sin que se sobreponga 
   * sobre los demás elementos
   */
  updateSidebarDisplay(){
    const width = window.innerWidth
    
    if(width>860){
      this.sidebar.nativeElement.style.display = 'flex';
      this.sidebar.nativeElement.style.position = 'relative';
    } else{
      this.sidebar.nativeElement.style.display = 'none';
    }
  }



}