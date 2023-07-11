import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { StoreService } from '@ng-mf/shared/store';
import { SearchComponent } from '../search/search.component';
import { AMIT } from '../token';

@Component({
  standalone: true,
  imports: [CommonModule, SearchComponent],
  selector: 'ng-mf-search-entry',
  template: `<ng-mf-search
    [text]="text"
    (check)="emit($event)"
  ></ng-mf-search>`,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class RemoteEntryComponent {
  @Input() text?: string;
  @Output() check = new EventEmitter<string>();

  
  injector: Injector = inject(Injector);
  

  emit(text: string): void {
    this.check.emit(text);
  }
}
