import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-export-table',
  standalone: true,
  imports: [],
  templateUrl: './export-table.component.html',
  styleUrl: './export-table.component.scss'
})
export class ExportTableComponent {
  @Input({required:true}) tableContent!: string
  @Input({required:true}) fileName!: string

  /**
   * Esta función se encarga de generar un archivo excel a partir del JSON que es 
   * mandado a través del input de este componente llamado "tableContent"
   */
  exportexcel(){
    const tableJson = JSON.parse(this.tableContent)
    console.log(tableJson)

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableJson);
    const workbook: XLSX.WorkBook = {Sheets:{'data':worksheet},SheetNames:['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType:'xlsx', type:'array'});
    this.saveExcel(excelBuffer,this.fileName);
  }

  /**
   * Esta función es la encargada de descargar el archivo de excel que generó la función exportexcel()
   * 
   * @param buffer El contenido que será descargado, en este caso, el excel
   * @param fileName El nombre del archivo que se le asignará cuando se vaya a descargar
   */
  saveExcel(buffer:any, fileName:string): void{
    const data: Blob = new Blob([buffer],{type:'application/octet-stream'});
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = window.URL.createObjectURL(data)
    link.download = fileName + '.xlsx';
    link.click();
  }
}
