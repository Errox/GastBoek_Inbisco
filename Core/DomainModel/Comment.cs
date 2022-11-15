namespace Core.DomainModel
{
    public class Comment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        // Image
        public byte[] Image { get; set; }
        // public bool Deleted { get; set; }
        // public string ReasonOfDeletion {get; set;}
        public ApplicationUser Author { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
