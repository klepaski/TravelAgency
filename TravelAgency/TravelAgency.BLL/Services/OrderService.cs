using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.BLL.Intrefaces;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;
using TravelAgency.Model.ViewModels.Order;
using TravelAgency.Model.ViewModels.User;

namespace TravelAgency.BLL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IOrderRepository orderRepository, IUnitOfWork unitOfWork)
        {
            _orderRepository = orderRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Cancel(int orderId)
        {
            Orderr order = _orderRepository.GetById(orderId);           

            if (order == null)
            {
                return false;
            }

            var fHotel = await _unitOfWork.Hotels.GetById(order.HotelId);
            var fTour = await _unitOfWork.Tours.GetById(fHotel.TourId);
            fHotel.HotelSize++;
            await _unitOfWork.Hotels.Update(fHotel);

            return await _orderRepository
                .Cancel(order);
        }

        public async Task<bool> Create(OrderVM order, UserVM user)
        {
            var fHotel = await _unitOfWork.Hotels.GetById(order.HotelId);
            var fTour = await _unitOfWork.Tours.GetById(fHotel.TourId);
            if (fHotel != null && fHotel.HotelSize > 0) fHotel.HotelSize--;
            else return false;
            await _unitOfWork.Hotels.Update(fHotel);
            var fOrder= await _orderRepository.Create(new Orderr()
            {
                Cost = order.Cost,
                DateOrder = DateTime.Now,
                HotelId = order.HotelId,
                UserId = user.UserId,
            });
             new EmailService().SendAsyncEmail(user.Email, "YU-TRAVEL♥", $"Вы успешно забронировали тур {fTour.TourName} в отеле {fHotel.HotelName}.\n Дата отправления: {fTour.DateStart} \nМесто отправления: {fTour.CountryFrom} \nМесто прибытия: {fTour.CountryTo}. Для подтверждения заказа с вами свяжется наш специалист.");
            return fOrder;
        }

        public IEnumerable<OrderVM> GetOrderByUser(UserVM user)
        {

            return _orderRepository.GetOrderByUser(user.UserId)
                .Select(x => new OrderVM()
                {
                    Cost = x.Cost,
                    DateOrder = x.DateOrder,
                    HotelId = x.HotelId,
                    OrderId = x.OrderId
                });
        }

        public async Task<OrderInfoVM> GetOrderInfo(int hotelId)
        {
            Hotel hotel = await _unitOfWork.Hotels
                .GetById(hotelId);

            Tour tour = await _unitOfWork.Tours
                .GetById(hotel.TourId);

            return new OrderInfoVM()
            {
                Class = hotel.Class,
                TourId = tour.TourId,
                CountryFrom = tour.CountryFrom,
                CountryTo = tour.CountryTo,
                DateStart = tour.DateStart,
                Description = hotel.Description,
                Duration = tour.Duration,
                HotelId = hotel.HotelId,
                HotelName = hotel.HotelName,
                TotalCost = hotel.Cost + tour.Cost * (100 - tour.Sale) /100,
                HotelSize = hotel.HotelSize,
                TourName = tour.TourName,
                Transport = tour.Transport,
                AboutTour = tour.AboutTour
            };
        }
    }
}
