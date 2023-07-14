import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { StoreService } from '@ng-mf/shared/store';
import { STORE_SERVICE } from '../token';

@Component({
  standalone: true,
  template: `
    <div class="container">
      <div class="header">{{ title }}</div>
      <div class="content">{{ content }}</div>
      <div class="actions">
        <button mat-raised-button (click)="response(true)">Yes</button>
        <button mat-raised-button (click)="response(false)">No</button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        margin: auto;
        width: 100%;
        height: 100%;
      }
      .container {
        display: flex;
        flex-direction: column;
        background-color: cornflowerblue;
        width: 100%;
        height: 100%;
      }
      .header {
        font-size: 18px;
        align-text: center;
      }
      .actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    `,
  ],
  imports: [MatButtonModule],
})
export class ModalComponent {
  @Input() title = 'xfchdf';
  @Input() content = 'jsfgjsf';

  @Output() closed = new EventEmitter<boolean>();

  store: StoreService = inject(STORE_SERVICE);

  response(response: boolean): void {
    if (response)
      this.store.update({ user: 'works!', data: [{ id: '2', display: '2' }] });
    this.closed.emit(response);
  }
}