using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels
{
    public class AddComment
    {
        [Required]
        [MaxLength(255, ErrorMessage = "The property {0} doesn't have more than {1} elements")]
        public string Title { get; set; }
        [Required]
        [MaxLength(255, ErrorMessage = "The property {0} doesn't have more than {1} elements")]
        public string Description { get; set; }
    }
}
