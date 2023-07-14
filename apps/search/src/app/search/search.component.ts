import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { PanelService, StoreService } from '@ng-mf/shared/store';
import { PANEL_SERVICE, STORE_SERVICE } from '../token';
import { ModalComponent } from './model.component';

@Component({
  selector: 'ng-mf-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input() text?: string;
  @Output() check = new EventEmitter<string>();
  storeService: StoreService = inject(STORE_SERVICE);
  panelService: PanelService = inject(PANEL_SERVICE);

  data$ = this.storeService.select(s => s.data);

  click(): void {
	const modal = this.panelService.createComponentPortal(ModalComponent);
	this.panelService.openPanel('panel', modal, {
		width: 500, height: 500
	});
    this.check.emit('bublil');
  }
}
