import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [MatProgressBarModule],
  template: '<mat-progress-bar mode="indeterminate"></mat-progress-bar>'
})
export class LoadingComponent { }
