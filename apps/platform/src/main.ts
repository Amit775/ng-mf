import { setRemoteDefinitions } from '@nx/angular/mf';
import { definitions } from './manifest/module-federation.manifest';

setRemoteDefinitions(definitions);
import('./bootstrap').catch((err) => console.error(err));
