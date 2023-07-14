import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';
import { PanelService, StoreService } from '@ng-mf/shared/store';

bootstrapApplication(AppComponent, appConfig)
.then((appRef: ApplicationRef) => {
	const injector = appRef.injector;
	const services: Record<string, unknown> = {
		store: injector.get(StoreService),
		panel: injector.get(PanelService)
	};

	(window as any).atlas = { services };
})
.catch((err) =>  console.error(err));
