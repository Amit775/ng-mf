import {
  Directive,
  Injector,
  Input,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Routes } from '@angular/router';
import { StoreService } from '@ng-mf/shared/store';
import { map } from 'rxjs';
import { loadDefaultRemoteEntry } from './utils';

@Directive({
  selector: '[ngMfEntry]',
  standalone: true,
})
export class EntryDirective implements OnInit {
  @Input({ required: true, alias: 'ngMfEntry' }) name!: string;

  private vcr: ViewContainerRef = inject(ViewContainerRef);
  private service: StoreService = inject(StoreService);

  ngOnInit(): void {
    console.log('name', this.name);
    loadDefaultRemoteEntry(this.name, './Routes')
      .pipe(
        map((routes: Routes) => {
          const component = routes[0].component;
          console.log(this.service);
          if (!component) return console.log('no component', routes);

          const instance = this.vcr.createComponent(component);
          instance.setInput('text', 'yatyyyy');
          setTimeout(() => instance.setInput('text', 'its changedddd'), 3000);
        })
      )
      .subscribe();
  }
}
