import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { StoreService } from '@ng-mf/shared/store';
import { AMIT } from '../token';

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
  service: StoreService = inject(AMIT);

  data$ = this.service.select(s => s.data);

  click(): void {
    this.check.emit('bublil');
  }
}
