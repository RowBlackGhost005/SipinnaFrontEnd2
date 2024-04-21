import { Component, inject } from '@angular/core';
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
  pageName = this.searchbarService.page
  searchControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  })

  handleEnter(){
    if (this.searchControl.valid) {
      const value = this.searchControl.value.trim();

      if (value !== '') {
        this.searchbarService.changePage(value)
        this.searchControl.setValue('');
        alert(this.pageName())
      }

    }

  }
}
