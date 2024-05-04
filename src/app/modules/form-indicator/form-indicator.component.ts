import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDominio } from '../../models/dominio.model';
import { DominioService } from '../../services/dominio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-indicator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-indicator.component.html',
  styleUrl: './form-indicator.component.scss'
})
export class FormIndicatorComponent {
  formularioIndicador: FormGroup
  dominiosData: IDominio[] = [];

  private _dominioService = inject(DominioService);

  @Output() submitForm: EventEmitter<FormData> = new EventEmitter<FormData>();
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('validate') inputElementRef!: ElementRef<HTMLInputElement>;


  constructor(private form: FormBuilder) {
    this.formularioIndicador = this.form.group({
      nombre: ['', Validators.required],
      dominioNavId: ['', Validators.required],
      metadato: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this._dominioService.getDominios().subscribe((data: IDominio[]) => {
      this.dominiosData = data;
    })
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioIndicador.get(controlName)?.hasError(errorType) && this.formularioIndicador.get(controlName)?.touched
  }

  onSubmit() {
    const formData = new FormData();

    // Itera sobre los controles del formulario y agrega sus valores al objeto FormData
    Object.keys(this.formularioIndicador.controls).forEach(controlName => {
      const controlValue = this.formularioIndicador.controls[controlName].value;

      if (controlName == 'metadato') {
        const fileInputElement: HTMLInputElement = this.fileInput.nativeElement;

        if (fileInputElement.files && fileInputElement.files.length > 0) {
          const file: File = fileInputElement.files[0];
          formData.append(controlName, file);
        }
      
      } else {
        formData.append(controlName, controlValue);
      }
    });

    this.submitForm.emit(formData);
    this.formularioIndicador.reset();
  }

  setIndicadorValues(indicador: any) {
    this.formularioIndicador.patchValue({
      nombre: indicador.nombre,
      dominioNavId: 5,
    });
  }

  /**
   * Este método es para validar que en el buscador solo se agreguen caracteres alfanuméricos cuando se pulsan las teclas, sin caracteres especiales.
   * Solo en caso de que se necesite de esta validación
   * 
   * -Acepta caracteres de la A-Z, números 0-9 y los espacios. Y toda tecla pulsada la transformará a mayúscula.-
   */
    validateAlphanumeric() {
        const inputElement = this.inputElementRef.nativeElement;
        let value = inputElement.value;
  
        value = value.replace(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]/g, '');
        value = value.toUpperCase();
  
        inputElement.value = value;
      
    }
}