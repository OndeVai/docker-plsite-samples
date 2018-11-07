using System;
using Microsoft.EntityFrameworkCore;

namespace aspnetcore_site.Models
{
    public class Document {
        public Guid Id {get;set;}
        public string Title {get;set;}
    }

    public class MyDbContext: DbContext
    {
         public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        { }

        public DbSet<Document> Documents { get; set; }
    }

    
}