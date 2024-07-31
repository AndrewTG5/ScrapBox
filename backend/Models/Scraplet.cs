using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Scraplet
    {
        [Key]
        public long Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; }

    }
}
