import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { OverlayService } from '../overlay/overlay.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css'],
})
export class ProgressSpinnerComponent implements OnInit, AfterViewInit {
  @Input() public color ? = 'accent';
  @Input() public diameter ? = 40;
  @Input() public mode?: ProgressSpinnerMode = 'indeterminate';
  @Input() public strokeWidth ? = 10;
  @Input() public value?: number;
  @Input() public backdropEnabled = true;
  @Input() public positionGloballyCenter = true;
  @Input() public displayProgressSpinner: boolean;

  @ViewChild('progressSpinnerRef') private progressSpinnerRef: TemplateRef<any>;
  constructor(private vcRef: ViewContainerRef, private overlayService: OverlayService) { }
  public ngOnInit() { }
  public ngAfterViewInit() {
    this.overlayService.createOverlay(this.progressSpinnerRef, this.vcRef);
  }
}
