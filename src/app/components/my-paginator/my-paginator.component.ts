import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Pagable {
  totalPages: number;
  currentPage: number;
  limit: number;
}

@Component({
  selector: 'app-my-paginator',
  templateUrl: './my-paginator.component.html',
  styleUrls: ['./my-paginator.component.css']
})
export class MyPaginatorComponent {
  @Input() pagable: Pagable;
  @Output() changePage = new EventEmitter;

  get pageSize() {
    return Array.from(Array(this.pagable.totalPages).keys());
  }

  prevPage() {
    this.setPage(this.pagable.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.pagable.currentPage + 1);
  }

  setPage(i) {
    this.changePage.emit(i);
  }
}
