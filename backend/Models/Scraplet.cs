namespace backend.Models
{
    public class Scraplet
    {
        public long Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; }

    }
}
