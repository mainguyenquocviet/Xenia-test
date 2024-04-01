import { Component } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgForm } from "@angular/forms";
import { Book } from 'src/app/shared/book.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styles: [
  ]
})
export class BookFormComponent {

  constructor(public service: BookService, private toastr: ToastrService) {
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if (form.valid) {
      if (this.service.formData.bookId == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
    }

  }

  insertRecord(form: NgForm) {
    this.service.postBook()
      .subscribe({
        next: res => {
          this.service.list = res as Book[]
          this.service.resetForm(form)
          this.toastr.success('Inserted successfully', 'Book App')
        },
        error: err => { console.log(err) }
      })
  }
  updateRecord(form: NgForm) {
    this.service.putBook()
      .subscribe({
        next: res => {
          this.service.list = res as Book[]
          this.service.resetForm(form)
          this.toastr.info('Updated successfully', 'Book App')
        },
        error: err => { console.log(err) }
      })
   }

}
