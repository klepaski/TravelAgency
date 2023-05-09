using System;

namespace TravelAgency.Model.ViewModels.Order
{
    public class OrderVM
    {
        public int OrderId { get; set; }
        public int Cost { get; set; }
        public DateTime DateOrder { get; set; }
        public int HotelId { get; set; }
    }
}
