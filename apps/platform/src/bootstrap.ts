import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';
import { StoreService } from '@ng-mf/shared/store';

bootstrapApplication(AppComponent, appConfig)
.then((appRef: ApplicationRef) => {
	const injector = appRef.injector;
	const commonServices: Record<string, unknown> = {
		store: injector.get(StoreService)
	};

	(window as any).atlas = { commonServices };
})
.catch((err) =>  console.error(err));
