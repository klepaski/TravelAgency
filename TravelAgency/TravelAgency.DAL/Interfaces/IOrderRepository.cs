using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.DAL.Entities;

namespace TravelAgency.DAL.Interfaces
{
    public interface IOrderRepository
    {
        IEnumerable<Orderr> GetOrderByUser(string userId);
        Orderr GetById(int hotelId);
        Task<bool> Create(Orderr entity);
        Task<bool> Cancel(Orderr entity);
    }
}
