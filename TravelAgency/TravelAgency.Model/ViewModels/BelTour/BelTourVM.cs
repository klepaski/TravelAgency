using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Model.ViewModels.BelTour
{
    public class BelTourVM
    {
        public int BelTourId { get; set; }

        public string BelTourName { get; set; }

        public string PlaceFrom { get; set; }

        public string PlaceTo { get; set; }

        public int Duration { get; set; }

        public int Cost { get; set; }
        public string ImagePath { get; set; }

        public string AboutTour { get; set; }

        public string Transport { get; set; }
        public int Sale { get; set; }
        public DateTime DateStart { get; set; }
    }
}
