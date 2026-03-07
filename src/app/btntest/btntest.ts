import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-btntest',
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './btntest.html',
  styleUrl: './btntest.scss',
})
export class Btntest {}
