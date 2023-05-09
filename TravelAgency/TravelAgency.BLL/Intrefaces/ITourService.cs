using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgency.Model.ViewModels.Hotel;
using TravelAgency.Model.ViewModels.Tour;

namespace TravelAgency.BLL.Intrefaces
{
    public interface ITourService : IBaseService<TourVM>
    {
        Task<IEnumerable<HotelVM>> GetHotelsById(int pageSize, int pageCurrent, int tourId);
        Task<int> CountHotelsById(int tourId);
        Task<IEnumerable<TourVM>> GetHotToursPagination(int pageSize, int pageCurrent);
    }
}
