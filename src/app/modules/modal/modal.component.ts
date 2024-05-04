import { Component, ElementRef, NgModule, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DominioService } from '../../services/dominio.service';
import { IDominio } from '../../models/dominio.model';
import { EnlaceService } from '../../services/enlace.service';
import { IEnlace } from '../../models/enlace.model';
import { NoticiaService } from '../../services/noticia.service';
import { INoticia } from '../../models/noticia.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RubroService } from '../../services/rubro.service';
import { IRubro } from '../../models/rubro.model';
// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Output() nuevoGuardado: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('modal') modal?: ElementRef;
  private _rubroService = inject(RubroService);

  //Variable para el titulo del modal
  title: string = '';

  //Variables para los datos del input de Nombres
  //
  //lblNombre: Texto que estara en el label
  //placeholderNombre: Mensaje que estara en el input
  //showNameInput: Para si deseas mostrar ese input
  //activo: Switch para activar o desactivar dominio.
  //showSwitchInput: Para si deseas mostrar el switch
  lblNombre: string = '';
  placeholderNombre: string = '';
  showNameInput: boolean = false;
  activo: boolean = true;
  showSwitchInput: boolean = false;

  //Variables para los datos del input de la Url
  //
  //lblUrl: Texto que estara en el label
  //placeholderUrl: Mensaje que estara en el input
  //showUrlInput: Para si deseas mostrar ese input
  lblUrl: string = '';
  placeholderUrl: string = '';
  showUrlInput: boolean = false;

  //Variables para los datos del input del input File
  //
  //lblFile: Texto que estara en el label
  //showFileInput: Para si deseas mostrar ese input
  //advertenciaFormato: Para mostrar en texto, el formato que debe subirse.
  lblFile: string = ''
  showFileInput: boolean = false;
  advertenciaFormato: string = '';


  //Variables para los datos del input Dropdown
  //
  //lblRubro: Texto que estara en el label
  //showDropdownInput: Para si deseas mostrar ese input
  lblRubro: string = '';
  showDropdownInput: boolean = false;

  //Variable para poner el signo de "*" al lado de las label 
  isNameRequired: boolean = true;

  //Parametro que se envia al boton de guardar:
  //Nombre dominio, enlace, noticia.
  name: string = '';
  //Url de enlace o noticia.
  url: string = '';
  // Variable para almacenar la opción seleccionada del dropdown para los rubros.
  selectedOption: string | null = null;
  //Variable para guardar el nombre de la imagen o archivo seleccionado
  imageUrl: string = '';

  selectedFileName: string = '';


  //Para manejar la accion que realizara el boton de guardar
  accionBtnGuardar: string = '';



  openModalDominio(title: string,
    lblNombre: string, placeholderNombre: string, showNameInput: boolean,
    showSwitchInput: boolean,
    accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showNameInput = showNameInput;
    this.showSwitchInput = showSwitchInput;
    this.accionBtnGuardar = accion;

    $(this.modal?.nativeElement).modal('show');
  }

  openModalNoticia(title: string,
    lblNombre: string, placeholderNombre: string, showNameInput: boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblFile: string, advertenciaFormato: string, showFileInput: boolean,
    accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showNameInput = showNameInput;
    this.lblUrl = lblUrl;
    this.placeholderUrl = placeholderUrl;
    this.showUrlInput = showUrlInput;
    this.lblFile = lblFile;
    this.advertenciaFormato = advertenciaFormato;
    this.showFileInput = showFileInput;

    this.accionBtnGuardar = accion;

    $(this.modal?.nativeElement).modal('show');
  }

  openModalEnlace(title: string,
    lblNombre: string, placeholderNombre: string, showNameInput: boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showNameInput = showNameInput;
    this.lblUrl = lblUrl;
    this.placeholderUrl = placeholderUrl;
    this.showUrlInput = showUrlInput;
    this.accionBtnGuardar = accion;

    $(this.modal?.nativeElement).modal('show');
  }



  openModalRubro(title: string,
    lblFile: string, advertenciaFormato: string, showFileInput: boolean,
    lblRubro: string, showDropdownInput: boolean,
    accion: string) {
    this.title = title;
    this.lblFile = lblFile;
    this.advertenciaFormato = advertenciaFormato;
    this.showFileInput = showFileInput;
    this.lblRubro = lblRubro;
    this.showDropdownInput = showDropdownInput;
    this.accionBtnGuardar = accion;

    $(this.modal?.nativeElement).modal('show');
  }


  //Funcion para cerrar el modal
  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }


  //Valores del dropdown
  //label: Lo que se muestra
  //value:Valor real tipo string
  dropdownOptions = [
    { label: '<1', value: '<1' },
    { label: '1 a 2', value: '1 a 2' },
    { label: '3 a 5', value: '3 a 5' },
    { label: '0 a 11', value: '0 a 11' },
    { label: '0 a 17', value: '0 a 17' },
    { label: '12 a 17', value: '12 a 17' },
    { label: '6 a 11', value: '6 a 11' }
  ];



  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Verificar si el tipo de archivo es una imagen
      if (file.type.match(/^image\/.*/) != null) {
        this.selectedFileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.imageUrl = e.target.result;
          console.log("nombre de la imagen:", this.imageUrl);
        };
      } else {
        console.log('Error: El archivo seleccionado no es una imagen.');
      }
    }
  }


  //Funcion para el boton de guardar, recibe parametros para saber que accion ejecutar
  ejecutarAccion(nombre: string, url: string, imagen: string) {
    if (this.accionBtnGuardar === 'dominio') {
      this.guardarDominio(nombre, this.activo);
    } else if (this.accionBtnGuardar === 'guardarEnlace') {
      this.guardarEnlace(nombre, url);
    } else if (this.accionBtnGuardar === 'noticia') {
      this.guardarNoticia(nombre, url, imagen);
    } else if (this.accionBtnGuardar === 'rubro') {

    }
  }


  //Constructor de las Interfaces
  constructor(private dominioService: DominioService,
    private enlaceService: EnlaceService,
    private noticiaService: NoticiaService) { }



  //GUARDAR DOMINIO
  guardarDominio(nombreDominio: string, estadoDominio:boolean) {
    const nuevoDominio: IDominio = {
      nombre: nombreDominio,
      estado: estadoDominio
    };

    this.dominioService.postDominio(nuevoDominio).subscribe(
      response => {
        console.log('Dominio guardado correctamente: ', response);
        this.nuevoGuardado.emit();
      },
      error => {
        console.error('error al guardar el dominio: ', error);
      }
    );

    this.closeModal()
  }






  enlaceI: IEnlace = {
    titulo: '',
    enlace: '',
    idenlaces: 0
  };
  //GUARDAR ENLACE (Funciona)
  guardarEnlace(tituloEnlace: string, urlEnlace: string) {
    this.enlaceI = {
      idenlaces: 0,
      titulo: tituloEnlace,
      enlace: urlEnlace
    };

    this.enlaceService.postEnlace(this.enlaceI).subscribe(
      response => {
        console.log('Enlace guardado correctamente: ', response);
        this.nuevoGuardado.emit();
      },
      error => {
        console.error('error al guardar el Enlace: ', error);
      }
    );

    this.closeModal()
  }



  //GUARDAR NOTICIA (Funciona pero falta solucionar la imagen)
  guardarNoticia(titulo: string, enlace: string, imagen: string) {
    const nuevaNoticia: INoticia = {
      titulo: titulo,
      imagen: imagen,
      enlace: enlace
    };

    this.noticiaService.postNoticia(nuevaNoticia).subscribe(
      response => {
        console.log('Noticia guardada correctamente: ', response);
        this.nuevoGuardado.emit();
      },
      error => {
        console.error('error al guardar la noticia: ', error);
      }
    );

    this.closeModal()
  }


  //NO FUNCIONA
  guardarRubroDeIndicador(nombreRubro: string, datos: File, idIndicador: number) {
    const rubro = nombreRubro;
    const datoss = datos;
    const id = idIndicador.toString();

    const formData = new FormData();
    formData.append('rubro', rubro);
    formData.append('datos', datoss);
    formData.append('idindicador', id);

    this._rubroService.postRubroIndicador(formData).subscribe((data: IRubro) => {
      console.log('Se agregó correctamente el rubro del indicador');
    }, error => {
      console.log('Error al guardar el rubro');
    });
  }
}