import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';
import { Btntest } from './btntest/btntest';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DashboardComponent, Btntest, AddressFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
