import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store';

@NgModule({
  imports: [CommonModule],
  providers: [StoreService]
})
export class SharedStoreModule {}
