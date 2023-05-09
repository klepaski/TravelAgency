using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAgency.DAL.Context;
using TravelAgency.DAL.Entities;
using TravelAgency.DAL.Interfaces;

namespace TravelAgency.DAL.Repositories
{
    public class TourRepository
          : BaseRepository<Tour>, ITourRepository
    {
        private readonly DatabaseContext _context;

        public TourRepository(DatabaseContext context)
            : base(context)
        {
            _context = context;
        }

        public async Task<int> GetCountHotelsById(int tourId)
        {
            return await _context.Hotels
                .Where(x => x.TourId == tourId)
                .CountAsync();
        }

        public async Task<IEnumerable<Hotel>> GetHotelsById(int sizePage, int currentPage, int tourId)
        {
            return await _context.Hotels
                .Where(x => x.TourId == tourId)
                .Skip((currentPage - 1) * sizePage).Take(sizePage)
                .ToListAsync();
        }

        public async Task<IEnumerable<Tour>> GetHotToursPagination(int sizePage, int currentPage)
        {
            return await _context.Set<Tour>()
                .Skip((currentPage - 1) * sizePage).Take(sizePage)
                .ToListAsync();
        }
    }
}
