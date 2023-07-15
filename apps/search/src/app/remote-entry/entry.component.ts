import { CommonModule } from '@angular/common';
import {
	CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { createCustomElement } from '@angular/elements';

@Component({
  standalone: true,
  imports: [CommonModule, SearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'ng-mf-search-entry',
  template: `<ng-mf-search
    [text]="text"
    (check)="emit($event)"
  ></ng-mf-search><wng-mf-search
    [text]="text"
    (check)="emitElement($event)"
  ></wng-mf-search>`,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class RemoteEntryComponent implements OnInit {
  @Input() text?: string;
  @Output() check = new EventEmitter<string>();

  injector: Injector = inject(Injector);

  ngOnInit(): void {
	const element = createCustomElement(SearchComponent, { injector: this.injector })
	customElements.define('wng-mf-search', element);
  }

  emitElement(event: Event): void {
	const custommEvent: CustomEvent = event as CustomEvent;
	this.emit(custommEvent.detail);
  }
  emit(text: string): void {
	console.log(text);
    this.check.emit(text);
  }
}
