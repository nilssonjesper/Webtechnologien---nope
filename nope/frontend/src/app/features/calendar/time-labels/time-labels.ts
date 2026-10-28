import { Component } from '@angular/core';

@Component({
  selector: 'app-time-labels',
  standalone: false,
  templateUrl: './time-labels.html',
  styleUrl: './time-labels.scss',
})
export class TimeLabels {
     hours = Array.from({length: 24}, (_, i) => i);
}
