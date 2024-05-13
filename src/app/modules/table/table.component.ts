import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren, ViewEncapsulation, inject } from '@angular/core';
import { TableModel } from '../../models/table';
import { UpperCasePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [UpperCasePipe, NgxPaginationModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnChanges {
  selectedItemIndex: number = -1;
  total: number = 0; // Total de elementos de la tabla
  pageSize = 6; // Total de elementos por página
  page = 1; // Página actual

  @Input() columns: TableModel[] = []; // Títulos de las columnas
  @Input() data: any[] = []; // Datos de la tabla

  @Output() selectEvent = new EventEmitter<any>();
  @Output() emitDownload = new EventEmitter<number>();

  //para el click
  @ViewChildren('clickable') td?: QueryList<ElementRef<HTMLTableCellElement>>;

  selectElement: any = {};

  /**
   * Esta función maneja la paginación de la tabla, calcula el índice correcto 
   * de acuerdo a todos los elementos de la tabla
   * @param localIndex El índice del elemento seleccionado en la página actual
   */
  selectItem(localIndex: number) {
    const globalIndex = (this.page - 1) * this.pageSize + localIndex;
    this.selectedItemIndex = globalIndex;
    this.sendElement();
  }

  /**
   * Esta función emite el evento con el elemento seleccionado en la tabla
   */
  sendElement() {
    this.selectElement = this.data[this.selectedItemIndex];
    this.selectEvent.emit(this.selectElement);
  }

  /**
   * Esta función valida que un valor sea string
   * @param value Cadena a validar
   * @returns true si es string, false en caso contrario
   */
  isText(value: any): boolean {
    return typeof value === 'string';
  }

  // Método para actualizar la variable "total" de la tabla cuando 
  // haya cambios en la lista de "data" y que la paginación se ajuste 
  // cuando cambie la cantidad de elementos de la tabla
  ngOnChanges(changes: SimpleChanges) {

    if (changes['data'] && changes['data'].currentValue) {
      this.total = this.data.length;
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.clickableCell()
    }, 300);

  }

  //OJO, esta función SOLO esta preparada para asignarle los "descargar" a los rubros
  //Si alguna tabla tiene la propiedad de "clickable" asignada en true, se ejecutará este método
  //con el fin de añadirle el evento click a las celdas que pertenecen a la columna "archivo" de rubros
  //
  clickableCell() {

    let arrayId:number[] = []

    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].clickable == true) {
        this.td?.forEach((tdElement) => {

          console.log(this.columns[i].header)

          //Agarra la casilla de los id y las almacena en un arreglo, para tener la referencia de a que ID pertenece 
          //cada boton de desacargar
          if(tdElement.nativeElement.cellIndex===1){
            arrayId.push(Number(tdElement.nativeElement.textContent))
            console.log('se puede con ', tdElement.nativeElement.textContent)
          }

          //Este 3 hace referencia a las celdas que pertenecen a la columna de "Archivo" ( | ID | Rubro | Archivo | <---)
          //en la página de rubros.          
          if (tdElement.nativeElement.cellIndex === 3) {
            
            //Agarra el ultimo id que fue registrado antes de llegar al descargar ( ---> | ID | Rubro | Archivo | )
            //para poder emitirlo
            let lastId = arrayId[arrayId.length-1]

            //Para emitir el ID del rubro que se busca descargar
            tdElement.nativeElement.addEventListener('click', () => {
              this.emitDownload.emit(lastId)
            });

            //Aplicarle los estilos a las celdas de descargar
            tdElement.nativeElement.textContent = '';
            tdElement.nativeElement.className = 'mdi mdi-download';
            tdElement.nativeElement.style.cursor = 'pointer';
            tdElement.nativeElement.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            tdElement.nativeElement.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
          }

        });
      }
    }
  }

    // Manejador de evento para 'mouseenter': Cambia el color de fondo
    handleMouseEnter(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      target.style.color = '#666666'; // Cambia 'yellow' por el color que prefieras
    }
  
    // Manejador de evento para 'mouseleave': Restablece el color de fondo
    handleMouseLeave(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      target.style.color = 'black'; // Restablece el color de fondo original
    }
}
