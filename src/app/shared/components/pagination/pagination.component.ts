import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() onPageNumber: EventEmitter<number> = new EventEmitter<number>();

  @Input('count') set _count(value: number) {
    this.count = value;
    this.pagesCount = Math.ceil(this.count / 10);
  }
  pagesCount = 0;
  count = 0;
  page = 1;
  constructor() {}

  ngOnInit(): void {}

  handlePageNumber(page: number) {
    this.page = page
    this.onPageNumber.emit(page);
  }
}
