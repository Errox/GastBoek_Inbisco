using Microsoft.AspNetCore.Identity;

namespace Core.DomainModel
{
    public class ApplicationUser : IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        // Image can't be saved in SQLite. 
        // 
        //public byte[] ProfilePicture { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}