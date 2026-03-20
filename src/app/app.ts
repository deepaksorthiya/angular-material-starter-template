import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavResponsiveExample } from './sidenav/sidenav-responsive-example';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavResponsiveExample],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
