import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

import { BlankLayoutComponent } from './layouts/blank-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';


export const routes: Routes = [
{
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
    {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'search/movie', component: SearchMovieComponent },
      { path: 'movie/list', component: MovieListComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
