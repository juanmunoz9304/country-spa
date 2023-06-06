import { Component } from '@angular/core';
import {Input} from '@angular/core'

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  @Input()
  public loadingText : string = '';
}
