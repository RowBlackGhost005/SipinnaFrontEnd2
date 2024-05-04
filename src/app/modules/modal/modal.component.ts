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
  @Output() nuevoGuardado:EventEmitter<void>=new EventEmitter<void>();
  @ViewChild('modal') modal?: ElementRef;
  private _rubroService = inject(RubroService);
  title: string = '';
  lblNombre: string = '';
  placeholderNombre: string = '';
  showNameInput:boolean=false;
  activo: boolean = true;
  showSwitchInput:boolean=false;
  lblUrl: string = '';
  placeholderUrl: string = '';
  isNameRequired: boolean = true;
  name: string = '';
  url: string = '';
  showUrlInput: boolean = false;
  advertenciaFormato:string='';
  lblFile: string = ''
  showFileInput:boolean= false;
  lblRubro:string='';
  showDropdownInput:boolean=false;
  accionBtnGuardar: string = '';

  openModal(title: string, lblNombre: string, placeholderNombre: string, showNameInput:boolean,
    showSwitchInput:boolean,
    lblUrl: string, placeholderUrl: string, showUrlInput: boolean,
    lblFile: string, advertenciaFormato:string, showFileInput: boolean,
    lblRubro:string,showDropdownInput:boolean, 
    accion: string) {
    this.title = title;
    this.lblNombre = lblNombre;
    this.placeholderNombre = placeholderNombre;
    this.showNameInput=showNameInput;
    this.showSwitchInput=showSwitchInput;
    this.lblUrl = lblUrl;
    this.placeholderUrl = placeholderUrl;
    this.showUrlInput = showUrlInput;
    this.lblFile = lblFile;
    this.advertenciaFormato=advertenciaFormato;
    this.showFileInput = showFileInput;
    this.lblRubro=lblRubro;
    this.showDropdownInput=showDropdownInput;
    this.accionBtnGuardar = accion;
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }

  dropdownOptions = [
    { label: '<1', value: '<1' },
    { label: '1 a 2', value: '1 a 2' },
    { label: '3 a 5', value: '3 a 5' },
    { label: '0 a 11', value: '0 a 11' },
    { label: '0 a 17', value: '0 a 17' },
    { label: '12 a 17', value: '12 a 17' },
    { label: '6 a 11', value: '6 a 11' }
  ];

  // Variable para almacenar la opción seleccionada
  selectedOption: string | null = null;


  imageUrl: string = '';
  selectedFileName: string = '';
  onFileSelected(event: any):void{
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
  ejecutarAccion(nombre: string, url: string,imagen:string) {
    if (this.accionBtnGuardar === 'dominio') {
      this.guardarDominio(nombre, this.activo);
    } else if (this.accionBtnGuardar === 'enlace') {
      this.guardarEnlace(nombre, url);
    } else if (this.accionBtnGuardar === 'noticia') {
      this.guardarNoticia(nombre,url,imagen);
    }else if (this.accionBtnGuardar === 'rubro') {

    }
  }


  //Constructor de las Interfaces
  constructor(private dominioService: DominioService,
    private enlaceService: EnlaceService,
    private noticiaService:NoticiaService){}



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

  //GUARDAR ENLACE 

  guardarEnlace(tituloEnlace: string, urlEnlace: string) {
    const nuevoEnlace: IEnlace = {
      titulo: tituloEnlace,
      enlace: urlEnlace
    };

    this.enlaceService.postEnlace(nuevoEnlace).subscribe(
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


  //GUARDAR NOTICIA
  guardarNoticia(  titulo: string, enlace: string,imagen: string ) {
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

  guardarRubroDeIndicador(nombreRubro: string, datos: File, idIndicador: number){
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