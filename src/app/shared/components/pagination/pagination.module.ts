import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [PaginationComponent],
  providers: [],
})
export class PaginationModule { }
