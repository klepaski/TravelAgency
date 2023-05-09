using System;

namespace TravelAgency.Model.ViewModels.Order
{
    public class OrderInfoVM
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; }
        public int Class { get; set; }
        public string Description { get; set; }
        /////////////////////////////////////////
        public int TourId { get; set; }
        public string TourName { get; set; }
        public string CountryFrom { get; set; }
        public string CountryTo { get; set; }
        public int Duration { get; set; }
        public string ImagePathT { get; set; }
        public string ImagePath { get; set; }
        public string Transport { get; set; }
        public string AboutTour { get; set; }
        public int HotelSize { get; set; }
        public DateTime DateStart { get; set; }
        /////////////////////////////////////////
        public int TotalCost { get; set; }
    }
}
