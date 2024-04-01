import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Book } from './book.model';
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string = environment.apiBaseUrl + '/Book'
  list: Book[] = [];
  formData: Book = new Book()
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as Book[]
        },
        error: err => { console.log(err) }
      })
  }

  postBook() {
    return this.http.post(this.url, this.formData)
  }

  putBook() {
    return this.http.put(this.url + '/' + this.formData.bookId, this.formData)
  }


  deleteBook(id: number) {
    return this.http.delete(this.url + '/' + id)
  }


  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new Book()
    this.formSubmitted = false
  }
}
