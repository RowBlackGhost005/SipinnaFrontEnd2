import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SearchbarService } from '../../services/searchbar.service';
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
  //@Output() textIngresed = new EventEmitter();


  handleEnter(){
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
}
