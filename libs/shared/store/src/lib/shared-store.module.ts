import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store';
import { PanelService } from './panel.service';

@NgModule({
  imports: [CommonModule],
  providers: [StoreService, PanelService]
})
export class SharedStoreModule {}
