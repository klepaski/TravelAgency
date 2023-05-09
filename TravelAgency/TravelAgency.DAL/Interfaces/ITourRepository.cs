using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.DAL.Entities;

namespace TravelAgency.DAL.Interfaces
{
    public interface ITourRepository
        : IBaseRepository<Tour>
    {
        Task<IEnumerable<Hotel>> GetHotelsById(int sizePage, int currentPage, int tourId);
        Task<int> GetCountHotelsById(int tourId);
        Task<IEnumerable<Tour>> GetHotToursPagination(int sizePage, int currentPage);
    }
}
