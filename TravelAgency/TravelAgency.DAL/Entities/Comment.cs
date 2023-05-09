using System;
using System.ComponentModel.DataAnnotations;

namespace TravelAgency.DAL.Entities
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public DateTime DateMessage { get; set; }
        [Required]
        public bool IsRight { get; set; }

        public string UserId { get; set; }
        public string Email { get; set; }
        public virtual User User { get; set; }
        
        public int TourId { get; set; }//d
        public virtual Tour Tour { get; set; }
    }
}
