import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { SearchbarService } from '../../../services/searchbar.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  private searchbarService = inject(SearchbarService)
  results = this.searchbarService.results
  searchControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  })
  /**
   * Este booleano esta hecho para comprobar si el buscador solo podrá recibir valores de tipo alfanumérico, 
   * omitiendo caracteres especiales. Como es propiedad del buscador, necesita pasar por el componente top-menu
   * para despues llegar al componente de la página para que le puedan asignar el valor de verdadero o falso.
   * Todavía puede ser optimizado si en lugar de ser un input pasado por 2 componentes lo vuelven un servicio como searchbarservice
   */
  @Input({ required: true }) alphanumericOnly!: boolean;

  
  @ViewChild('validate') inputElementRef!: ElementRef<HTMLInputElement>;
  //@Output() textIngresed = new EventEmitter();


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.inputElementRef.nativeElement.addEventListener('input', this.validateAlphanumeric.bind(this));
  }

  /**
   * Este método se ejecuta cuando se pulsa enter en el buscador,
   * obtiene el valor de lo que ha sido escrito para emitirlo en un evento,
   * dicho evento va a ser escuchado por la página en la que se encuentre el usuario, 
   * y es la página quien cambiará los valores mostrados en las tablas con base a lo escrito en el buscador.
   */
  handleEnter() {
    if (this.searchControl.valid) {
      const value = this.searchControl.value.trim();

      if (value !== '') {
        this.searchbarService.changeResults(value)
        this.searchControl.setValue('');
        //this.textIngresed.emit(this.pageName())
        this.searchbarService.emitEvent(this.results())
      }

    }

  }

  /**
   * Este método es para validar que en el buscador solo se agreguen caracteres alfanuméricos cuando se pulsan las teclas, sin caracteres especiales.
   * Solo en caso de que se necesite de esta validación
   * 
   * -Acepta caracteres de la A-Z, números 0-9 y los espacios. Y toda tecla pulsada la transformará a mayúscula.-
   */
  validateAlphanumeric() {

    if(this.alphanumericOnly===true){
      const inputElement = this.inputElementRef.nativeElement;
      let value = inputElement.value;

      value = value.replace(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]/g, '');
      value = value.toUpperCase();

      inputElement.value = value;
    }
  }
}
