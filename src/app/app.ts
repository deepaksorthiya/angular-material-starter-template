import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavResponsive } from './sidenav/sidenav-responsive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavResponsive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
