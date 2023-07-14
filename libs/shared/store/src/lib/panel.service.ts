import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  Portal,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PanelService {
  private overlay = inject(Overlay);

  private panels: Record<string, OverlayRef> = {};

  public createTemplatePortal<T>(
    template: TemplateRef<T>,
    viewContainerRef: ViewContainerRef,
    context?: T | undefined,
    injector?: Injector | undefined
  ): TemplatePortal<T> {
    return new TemplatePortal(template, viewContainerRef, context, injector);
  }

  public createComponentPortal<T>(
    component: ComponentType<T>,
    viewContainerRef?: ViewContainerRef,
    injector?: Injector
  ): ComponentPortal<T> {
    return new ComponentPortal(component, viewContainerRef, injector);
  }

  public openPanel<T>(
    name: string,
    portal: ComponentPortal<T>,
    options?: OverlayConfig
  ): ComponentRef<T>;
  public openPanel<T>(
    name: string,
    portal: TemplatePortal<T>,
    options?: OverlayConfig
  ): ComponentRef<T>;
  public openPanel<T>(
    name: string,
    portal: Portal<T>,
    options?: OverlayConfig
  ): ComponentRef<T> | TemplateRef<T> {
    this.closePanel(name);
    const config = { ...this.getConfig(), ...options };
    const ref = this.overlay.create(config);
    this.panels[name] = ref;
    return ref.attach(portal);
  }

  public closePanel(name: string): void {
    const ref = this.panels[name];
    if (ref) {
      ref.detach();
      ref.dispose();
    }
  }

  public getPanel(name: string): OverlayRef | undefined {
    return this.panels[name];
  }

  private getConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const scrollStrategy = this.overlay.scrollStrategies.block();
    return { positionStrategy, scrollStrategy };
  }
}
