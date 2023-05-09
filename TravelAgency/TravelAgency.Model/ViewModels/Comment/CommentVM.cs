using System;

namespace TravelAgency.Model.ViewModels.Comment
{
    public class CommentVM
    {
        public int CommentId { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public DateTime DateMessage { get; set; }
        public int TourId { get; set; }
    }
}
