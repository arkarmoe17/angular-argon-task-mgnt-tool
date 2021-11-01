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
  maxShowPage = 10;

  get pageSize() {
    let currentPage = this.pagable.currentPage
    let total = this.pagable.totalPages
    let pages = []
    let remain = Array.from(Array(total).keys()).slice(currentPage < 0 ? 0 : currentPage, total); //2..9
    pages.push(...remain.slice(0, this.maxShowPage - pages.length))
    return pages
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
