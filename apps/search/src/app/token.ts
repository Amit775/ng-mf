import { InjectionToken } from '@angular/core';
import { StoreService } from '@ng-mf/shared/store';

export const AMIT = new InjectionToken<StoreService>('amit', {
	factory: () => (window as any).atlas.commonServices.store
});
