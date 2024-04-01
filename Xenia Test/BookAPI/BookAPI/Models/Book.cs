using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookAPI.Models
{
    public class Book
    {
        [Key]
        public int BookId { get; set; }

        [Column(TypeName ="nvarchar(50)")]
        public string Title { get; set; } = "";

        [Column(TypeName = "nvarchar(50)")]
        public string Author { get; set; } = "";

        [Column(TypeName = "decimal(10,2)")]
        public double Price { get; set; } = 0.00;

        [Column(TypeName = "int")]
        public int? Amount { get; set; } = 0;
    }
}
