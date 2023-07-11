import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { EntryDirective } from './entry.directive';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AppState, RowData, StoreService } from '@ng-mf/shared/store';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    EntryDirective,
    AsyncPipe,
    JsonPipe,
  ],
  selector: 'ng-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'platform';
  service: StoreService = inject(StoreService);

  data$: Observable<RowData[]> = this.service.select((s: AppState) => s.data ?? []);

  ngOnInit(): void {
    setTimeout(() => {
      this.service.update({ data: [{ id: '1', display: '1' }] });
    }, 2000);
  }
}
