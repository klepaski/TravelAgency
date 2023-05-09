using Microsoft.AspNetCore.Http;
using System.Collections;
using System.Collections.Generic;

namespace TravelAgency.Model.ViewModels.Hotel
{
    public class HotelVM
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; }
        public int Cost { get; set; }
        public int Class { get; set; }
        public string Description { get; set; }
        public int TourId { get; set; }
        //public List<IFormFile> Image { get; set; }
        //public IFormFileCollection Image { get; set; }
        //public IList<IFormFile> Image { get; set; }
       // public IFormFile ImagePath { get; set; }
       public string ImagePath { get; set; }
       public int HotelSize { get; set; }
    }
}
