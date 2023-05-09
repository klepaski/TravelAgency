using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TravelAgency.DAL.Entities
{
    public class BelTour
    {
        public BelTour()
        {
            Orders = new HashSet<Orderr>();
            //Pictures = new HashSet<Picture>();
        }

        [Key]
        public int BelTourId { get; set; }

        [Required]
        [StringLength(70)]
        public string BelTourName { get; set; }

        [Required]
        [StringLength(70)]
        public string PlaceFrom { get; set; }

        public string PlaceTo { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        public int Cost { get; set; }
        public string ImagePath { get; set; }

        [StringLength(2000)]
        public string AboutTour { get; set; }

        [StringLength(30)]
        public string Transport { get; set; }
        public int Sale { get; set; }
        [Required]
        public DateTime DateStart { get; set; }

        public virtual ICollection<Orderr> Orders { get; set; }
       // public virtual ICollection<Picture> Pictures { get; set; }
    }
}
