using TravelAgency.DAL.Context;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class HotelRepository
          : BaseRepository<Hotel>, IHotelRepository
    {
        public HotelRepository(DatabaseContext context)
            : base(context)
        {

        }
    }
}
