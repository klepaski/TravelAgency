using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.Model.ViewModels.Order;
using TravelAgency.Model.ViewModels.User;

namespace TravelAgency.BLL.Intrefaces
{
    public interface IOrderService
    {
        IEnumerable<OrderVM> GetOrderByUser(UserVM user);
        Task<bool> Create(OrderVM order, UserVM user);
        Task<bool> Cancel(int orderId);
        Task<OrderInfoVM> GetOrderInfo(int hotelId);
    }
}
