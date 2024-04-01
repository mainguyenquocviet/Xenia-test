using BookAPI.Controllers;
using BookAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BookUnitTest
{
    public class BookUnitTest
    {
        [Fact]
        public async void Adding_Book()
        {
            var options = new DbContextOptionsBuilder<BookContext>()
                .UseInMemoryDatabase(databaseName: "Book")
                .Options;

            // Insert seed data into the database using one instance of the context
            using (var context = new BookContext(options))
            {
                context.Books.Add(new Book { BookId = 1, Title = "Book 1", Author = "A", Price = 1000, Amount = 1 });
                context.Books.Add(new Book { BookId = 2, Title = "Book 2", Author = "B", Price = 2000, Amount = 2 });
                context.Books.Add(new Book { BookId = 3, Title = "Book 3", Author = "C", Price = 3000, Amount = 3 });
                context.SaveChanges();
            }

            // Use a clean instance of the context to run the test
            using (var context = new BookContext(options))
            {
                BookController bookController = new BookController(context);
                var books = bookController.GetBooks();
                Assert.Equal(3, books.Result.Value.Count());
            }
        }
    }
}