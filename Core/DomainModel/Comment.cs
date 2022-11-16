namespace Core.DomainModel
{
    public class Comment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }

        // Since images can't be stored in SQLite.
        // Just keep it gone for now until a better way for saving images.
        // public byte[] Image { get; set; }

        // Deleted and reasonofDeletion when admin user is combined
        // public bool Deleted { get; set; }
        // public string? ReasonOfDeletion {get; set;}

        public ApplicationUser Author { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
