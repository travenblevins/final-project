import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-movie',
  imports: [MatFormFieldModule, FormsModule, CommonModule, MatInputModule, MatCardModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent {
  searchText: string = '';

  clearSearch() {
    this.searchText = '';
  }
}
