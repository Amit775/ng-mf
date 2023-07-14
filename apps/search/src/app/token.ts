import { InjectionToken } from '@angular/core';
import { PanelService, StoreService } from '@ng-mf/shared/store';

export const STORE_SERVICE = new InjectionToken<StoreService>('atlas store', {
	factory: () => (window as any).atlas?.services?.store
});

export const PANEL_SERVICE = new InjectionToken<PanelService>('atlas panel', {
	factory: () => (window as any).atlas?.services?.panel
})
