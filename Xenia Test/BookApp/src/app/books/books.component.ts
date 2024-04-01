import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styles: [
  ]
})
export class BooksComponent implements OnInit {

  constructor(public service: BookService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Book) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deleteBook(id)
        .subscribe({
          next: res => {
            this.service.list = res as Book[]
            this.toastr.error('Deleted successfully', 'Book App')
          },
          error: err => { console.log(err) }
        })
  }

}
