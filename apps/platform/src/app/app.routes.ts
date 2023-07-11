import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { loadDefaultRemoteEntry } from './utils';

export const appRoutes: Route[] = [
  {
    path: 'search',
    loadChildren: () => loadDefaultRemoteEntry('search', './Routes'),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
