import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieComponent } from './components/movie/movie.component';

import { BlankLayoutComponent } from './layouts/blank-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';

import { authGuard } from './auth.guard';  // Import the auth guard

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
      { path: 'search/movie', component: SearchMovieComponent, canActivate: [authGuard] },  // Protect with auth guard
      { path: 'movie/list', component: MovieListComponent, canActivate: [authGuard] },         // Protect with auth guard
      { path: 'movie/:id', component: MovieComponent, canActivate: [authGuard] },             // Protect with auth guard
    ],
  },
  { path: '**', redirectTo: '' },
];
