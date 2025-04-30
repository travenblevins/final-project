import { Component } from '@angular/core';
import { TopnavComponent } from "../components/topnav/topnav.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  imports: [TopnavComponent, RouterOutlet],
  template: `
    <app-topnav></app-topnav>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class MainLayoutComponent {

}
