using System.Threading.Tasks;

namespace TravelAgency.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        ITourRepository Tours { get; }
        IHotelRepository Hotels { get; }
        IBelTourRepository BelTours { get; }
        Task<int> SaveChanges();
    }
}
