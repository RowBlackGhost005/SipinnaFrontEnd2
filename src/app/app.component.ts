import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
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
  
  // title = 'sipinna-frontend';
  // titleTop = signal("Inicio")
  // //es para mostrar o no la barra de búsqueda
  // showSearch = signal(true);

  // showsidebar = signal(false);

  // @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   this.getTitle();
  //   this.getSearchbarStatus();
  // }

  //  @HostListener('window:resize')
  //  onWindowResize(){
  //   this.updateSidebarDisplay();
  //  }

  // //Función para cambiar el título del header de la aplicación dependiendo de la sección en la que se encuentre el usuario
  // //Los numeros del switch hacen referencia al orden en el que estan los botones del menú.
  // //En el sidebar component, en los eventos click hay una función llamada OptionHandler(), esa funcion recibe un número como parámetro,
  // //dicho número es el que vale el parámetro de event en este caso
  // changeTitleTop(event:number){
  //   switch(event){
  //   case 1:
  //     this.titleTop.set("Inicio");
  //     this.showSearch.set(false);
  //     this.saveSearchbarStatus();
  //     this.saveTitle();
  //     break;
  //   case 2:
  //     this.titleTop.set("Dominios");
  //     this.showSearch.set(true);
  //     this.saveSearchbarStatus();
  //     this.saveTitle()
  //     break;
  //   case 3:
  //     this.titleTop.set("Indicadores");
  //     this.showSearch.set(true);
  //     this.saveSearchbarStatus();
  //     this.saveTitle();
  //     break;
  //   case 4:
  //     this.titleTop.set("Noticias");
  //     this.showSearch.set(true);
  //     this.saveSearchbarStatus();
  //     this.saveTitle();
  //     break;
  //   case 5:
  //     this.titleTop.set("Enlaces");
  //     this.showSearch.set(true);
  //     this.saveSearchbarStatus();
  //     this.saveTitle();
  //     break;
  //   case 6:
  //     this.titleTop.set("Usuarios");
  //     this.showSearch.set(true);
  //     this.saveSearchbarStatus();
  //     this.saveTitle();
  //     break;
  //   default:
  //     break;
  //   }
  // }
  // /**
  //  * Cuando recargas la página y te encuentras en dominio, indicadores, etc..., el titulo dice que se encuentra en 
  //  * inicio, con esta funcion guardamos el titulo en el localstorage para que ya no aparezca
  //  */
  // saveTitle(){
  //   const titleTop:string = this.titleTop()

  //   const jsonTitle = JSON.stringify(titleTop)

  //   localStorage.setItem('titleTop', jsonTitle)
  // }
  // /**
  //  * Para recuperar el titulo del localstorage
  //  */
  // getTitle(){
  //   const titleTopJSON = localStorage.getItem('titleTop')

  //   if(titleTopJSON !==null){
  //     const titleTop = JSON.parse(titleTopJSON)
  //     this.titleTop.set(titleTop)
  //   } else {
  //     this.titleTop.set("Inicio")
  //   }
  // }

  // /**
  //  * Cuando se recarga la página y te encuentras en el inicio, vuelve a aparecer el buscador, para evitar que aparezca
  //  * en inicio, se guarda el boolean en el localstorage
  //  */
  // saveSearchbarStatus(){
  //   const showSearch:boolean = this.showSearch()

  //   const jsonShow = JSON.stringify(showSearch)

  //   localStorage.setItem('showSearch', jsonShow)
  // }

  // /**
  //  * Para recuperar el estatus verdadero o falso para mostrar el buscador
  //  */
  // getSearchbarStatus(){
  //   const searchbarStatusJSON = localStorage.getItem('showSearch')

  //   if(searchbarStatusJSON !==null){
  //     const showSearch = JSON.parse(searchbarStatusJSON)
  //     this.showSearch.set(showSearch)
  //   } else {
  //     this.showSearch.set(false)
  //   }
  // }

  // hideSidebar(){      
  //   this.sidebar.nativeElement.style.display = 'none';
  // }

  // showSidebar(){
  //   this.sidebar.nativeElement.style.display = 'flex';
  //   this.sidebar.nativeElement.style.position = 'absolute';
  //   this.sidebar.nativeElement.style.zIndex = '1090';
  // }

  // updateSidebarDisplay(){
  //   const width = window.innerWidth
    
  //   if(width>860){
  //     this.sidebar.nativeElement.style.display = 'flex';
  //     this.sidebar.nativeElement.style.position = 'relative';
  //   } else{
  //     this.sidebar.nativeElement.style.display = 'none';
  //   }
  // }



}