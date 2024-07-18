using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class ScrapletContext : DbContext
{
    public ScrapletContext(DbContextOptions<ScrapletContext> options)
    : base(options)
    {
    }

    public DbSet<Scraplet> Scraplets { get; set; } = null!;
}