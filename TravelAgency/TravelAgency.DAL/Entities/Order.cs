using System;
using System.ComponentModel.DataAnnotations;

namespace TravelAgency.DAL.Entities
{
    public class Orderr
    {
        [Key]
        public int OrderId { get; set; }

        public int HotelId { get; set; }
        public virtual Hotel Hotel { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }

        public DateTime DateOrder { get; set; }
        public int Cost { get; set; }
    }
}
