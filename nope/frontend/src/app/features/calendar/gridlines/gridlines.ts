import { Component } from '@angular/core';

@Component({
  selector: 'app-gridlines',
  standalone: false,
  templateUrl: './gridlines.html',
  styleUrl: './gridlines.scss',
})
export class Gridlines {
   hours = Array.from({length: 24})
}
