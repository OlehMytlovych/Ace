import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {
  private spinnerOverlayConfig: AppOverlayConfig;
  private overlayRef: OverlayRef;
  private vcRef: ViewContainerRef;
  private spinnerTmpRef: TemplateRef<any>;
  private config: OverlayConfig;
  private templatePortal: TemplatePortal;

  constructor(
        private overlay: Overlay,
        ) {
    const hasBackdrop = true;
    const positionStrategy: PositionStrategy = this.overlay.position()
                                                        .global()
                                                        .centerHorizontally()
                                                        .centerVertically();
    this.config = new OverlayConfig({ hasBackdrop, positionStrategy });
  }

  public createOverlay(spinnerTemplateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef): void {
    this.templatePortal = new TemplatePortal(spinnerTemplateRef, viewContainerRef);
    this.overlayRef = this.overlay.create(this.config);
  }

  public enable() {
    if (this.overlayRef) { this.overlayRef.attach(this.templatePortal); }
  }

  public disable() {
    if (this.overlayRef) { this.overlayRef.detach(); }
  }

}

export interface AppOverlayConfig extends OverlayConfig { }
