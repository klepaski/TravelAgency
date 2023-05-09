using System;

namespace TravelAgency.Model.ViewModels.Tour
{
    public class TourVM
    {
        public int TourId { get; set; }
        public string TourName { get; set; }
        public string CountryFrom { get; set; }
        public string CountryTo { get; set; }
        public int Duration { get; set; }
        public int Cost { get; set; }
        public string ImagePath { get; set; }

        public string AboutTour { get; set; }
        public string Transport { get; set; }
        public int IsHotTour { get; set; }
        public int Sale { get; set; }
        public DateTime DateStart { get; set; }
    }
}
