using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [MaxLength(255, ErrorMessage = "The property {0} doesn't have more than {1} elements")]
        public string Firstname { get; set; }
        [Required]
        [MaxLength(255, ErrorMessage = "The property {0} doesn't have more than {1} elements")]
        public string Lastname { get; set; }

        // Image can't be saved in SQLite. 
        // 
        //public byte[] ProfilePicture { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}